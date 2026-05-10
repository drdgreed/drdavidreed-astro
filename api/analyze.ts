/**
 * /api/analyze — Vercel Edge function for the Fit Check page.
 *
 * Takes a job description, returns a structured honest fit assessment.
 *
 * Request:
 *   POST /api/analyze
 *   { jobDescription: string }
 *
 * Response (200):
 *   {
 *     verdict: "strong_fit" | "worth_conversation" | "probably_not",
 *     headline: string,        // one-line summary
 *     opening: string,         // 1–2 sentence framing
 *     gaps: [{ requirement, gap_title, explanation }],
 *     transfers: string,       // what skills/experience transfer
 *     recommendation: string   // what David recommends to the hirer
 *   }
 *
 * Strategy: Claude tool use to enforce the JSON schema. The model can't
 * deviate from the shape because we only let it call the `submit_fit_check`
 * tool — its output is validated client-side too as a safety net.
 *
 * Env vars (Vercel project settings):
 *   ANTHROPIC_API_KEY  required
 *   CLAUDE_MODEL       optional, defaults to claude-sonnet-4-5
 */
import Anthropic from '@anthropic-ai/sdk';
// `.js` extension required by Node ESM strict mode at runtime, even though
// the actual source file is `.ts`. TypeScript's resolver maps this back to
// `./_lib/profile-context.ts` at compile time.
import { DAVID_CONTEXT } from './_lib/profile-context.js';

// No `runtime` config — Vercel default Node.js serverless.
// See api/chat.ts for the full reason — Anthropic SDK needs Node modules.

const SYSTEM_PROMPT = `You are evaluating job descriptions for fit against
David Reed, PhD. Return an HONEST assessment — including when David is NOT
the right person. Visitors trust this tool because it tells the truth.

Below is David's profile. Use it as the ONLY source of truth about him.
Don't invent experience he doesn't have. If a JD requires skills in his
"Gaps" bucket, surface that in \`gaps\` — don't paper over it.

${DAVID_CONTEXT}

Verdict rubric:
- "strong_fit": JD matches multiple Strong items, no critical Gap items required.
  David should pursue.
- "worth_conversation": Mixed match. Some Strong overlap, one or two non-critical
  gaps. Worth a conversation.
- "probably_not": JD's core requirements fall in David's Gaps. Examples:
  iOS-native role, distributed training research, deep CUDA/kernel work.

Tone for opening/recommendation:
- First-person from David's perspective ("I" / "my").
- Direct, specific, no fluff.
- Reference concrete experience by company/program/metric when relevant.
`;

const SUBMIT_FIT_CHECK_TOOL = {
  name: 'submit_fit_check',
  description: 'Submit the structured fit check for the given job description.',
  input_schema: {
    type: 'object' as const,
    properties: {
      verdict: {
        type: 'string',
        enum: ['strong_fit', 'worth_conversation', 'probably_not'],
        description: 'Overall verdict per the rubric.',
      },
      headline: {
        type: 'string',
        description: 'One-line summary (≤ 12 words).',
      },
      opening: {
        type: 'string',
        description:
          '1–2 sentence framing in first person. Sets up the verdict honestly.',
      },
      gaps: {
        type: 'array',
        description:
          'Where David does NOT fit the JD. Empty array if there are no meaningful gaps.',
        items: {
          type: 'object',
          properties: {
            requirement: { type: 'string', description: 'The JD requirement' },
            gap_title: { type: 'string', description: 'Short label for the gap' },
            explanation: {
              type: 'string',
              description: 'Why David doesn\'t meet it. First person.',
            },
          },
          required: ['requirement', 'gap_title', 'explanation'],
        },
      },
      transfers: {
        type: 'string',
        description:
          'What skills/experience DO transfer. First person. Concrete examples.',
      },
      recommendation: {
        type: 'string',
        description:
          'David\'s recommendation to the hirer. First person. If gaps are critical, suggest someone else; if mixed, suggest a conversation; if strong fit, propose next steps.',
      },
    },
    required: ['verdict', 'headline', 'opening', 'gaps', 'transfers', 'recommendation'],
  },
};
// Note: no outer `as const` here. Anthropic's SDK Tool type expects
// `required: string[]` (mutable). The outer const was over-aggressive
// and made the array readonly, breaking the type check.

interface FitResult {
  verdict: 'strong_fit' | 'worth_conversation' | 'probably_not';
  headline: string;
  opening: string;
  gaps: Array<{ requirement: string; gap_title: string; explanation: string }>;
  transfers: string;
  recommendation: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let jobDescription: string;
  try {
    const body = (await req.json()) as { jobDescription?: string };
    jobDescription = String(body.jobDescription ?? '').trim();
    if (!jobDescription) {
      return new Response(JSON.stringify({ error: 'jobDescription required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Cap to 8K chars to control cost / prompt-length
    jobDescription = jobDescription.slice(0, 8000);
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = new Anthropic({ apiKey });
  const model = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5';

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      tools: [SUBMIT_FIT_CHECK_TOOL],
      // `as const` on the .type literal so TS resolves it to `'tool'` not `string`.
      tool_choice: { type: 'tool' as const, name: 'submit_fit_check' },
      messages: [
        {
          // Same reason — SDK expects literal `'user'` not `string`.
          role: 'user' as const,
          content: `Job description:\n\n${jobDescription}\n\nCall submit_fit_check with the structured assessment.`,
        },
      ],
    });

    // Extract the tool-use block (forced via tool_choice).
    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (!toolUse || toolUse.type !== 'tool_use') {
      throw new Error('Model did not return a tool_use block');
    }

    const result = toolUse.input as FitResult;

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown error';
    return new Response(JSON.stringify({ error: msg.slice(0, 200) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
