/**
 * /api/analyze — Vercel Node serverless function. JD fit assessment.
 *
 * We use raw fetch() to Anthropic's REST API instead of @anthropic-ai/sdk
 * (SDK hangs at module-init in Vercel's Node 22 — see api/chat.ts).
 *
 * Request:
 *   POST /api/analyze/
 *   { jobDescription: string }
 *
 * Response (200 JSON):
 *   {
 *     verdict: 'strong_fit' | 'worth_conversation' | 'probably_not',
 *     headline, opening, gaps[], transfers, recommendation
 *   }
 *
 * Strategy: Claude tool_use forces structured output. We POST messages
 * with `tools` + `tool_choice: { type: 'tool', name: 'submit_fit_check' }`,
 * then extract the tool's `input` from the response.
 */
import { DAVID_CONTEXT } from './_lib/profile-context.js';

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
    type: 'object',
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
              description: "Why David doesn't meet it. First person.",
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
          "David's recommendation to the hirer. First person. If gaps are critical, suggest someone else; if mixed, suggest a conversation; if strong fit, propose next steps.",
      },
    },
    required: ['verdict', 'headline', 'opening', 'gaps', 'transfers', 'recommendation'],
  },
};

interface ContentBlock {
  type: string;
  input?: unknown;
}
interface AnthropicResponse {
  content?: ContentBlock[];
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
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
    jobDescription = jobDescription.slice(0, 8000);
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const model = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5';
  console.log('[analyze] entering', { model, jdLength: jobDescription.length });

  try {
    const aborter = new AbortController();
    const timeoutId = setTimeout(() => aborter.abort(), 25_000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        tools: [SUBMIT_FIT_CHECK_TOOL],
        tool_choice: { type: 'tool', name: 'submit_fit_check' },
        messages: [
          {
            role: 'user',
            content: `Job description:\n\n${jobDescription}\n\nCall submit_fit_check with the structured assessment.`,
          },
        ],
      }),
      signal: aborter.signal,
    });
    clearTimeout(timeoutId);

    console.log('[analyze] anthropic status', response.status);

    if (!response.ok) {
      const errBody = await response.text();
      console.error('[analyze] anthropic error', response.status, errBody);
      return new Response(
        JSON.stringify({
          error: `Anthropic ${response.status}: ${errBody.slice(0, 500)}`,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = (await response.json()) as AnthropicResponse;
    const toolUse = data.content?.find((b) => b.type === 'tool_use');
    if (!toolUse || !toolUse.input) {
      console.error('[analyze] no tool_use block', data);
      return new Response(
        JSON.stringify({ error: 'No tool_use block in response' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify(toolUse.input), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown error';
    console.error('[analyze] fetch failed', err);
    return new Response(JSON.stringify({ error: msg.slice(0, 500) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
