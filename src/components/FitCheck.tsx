/**
 * <FitCheck /> — interactive JD analyzer.
 *
 * UI replicates the Lovable JDAnalyzer. Backend is a POST endpoint
 * (`PUBLIC_ANALYZE_URL`) that takes `{ jobDescription }` and returns
 *
 *   {
 *     verdict: 'strong_fit' | 'worth_conversation' | 'probably_not',
 *     headline: string,
 *     opening: string,
 *     gaps: { requirement, gap_title, explanation }[],
 *     transfers: string,
 *     recommendation: string
 *   }
 *
 * Wire it up later — Vercel function, Cloudflare worker, Supabase, etc.
 * Until then, the form shows a "backend pending" message instead of failing.
 */
import { useState } from 'react';

type Verdict = 'strong_fit' | 'worth_conversation' | 'probably_not';

interface Gap {
  requirement: string;
  gap_title: string;
  explanation: string;
}

interface AnalysisResult {
  verdict: Verdict;
  headline: string;
  opening: string;
  gaps: Gap[];
  transfers: string;
  recommendation: string;
}

// Default to our Vercel Edge function; override per-environment if needed.
const ANALYZE_URL = (import.meta as any).env?.PUBLIC_ANALYZE_URL ?? '/api/analyze';

const EXAMPLE_STRONG = `Head of Applied AI — Series C SaaS
We're hiring a Head of Applied AI to lead our agentic platform.

Requirements:
- 10+ years engineering experience, 4+ in AI/ML leadership
- Track record shipping production multi-agent or LLM systems
- Comfortable with eval-driven development and governance
- Experience hiring senior IC and EM roles
- Background in regulated or high-stakes domain a plus`;

const EXAMPLE_WEAK = `Senior iOS Engineer — Mobile Platform
We're looking for a Senior iOS Engineer to build our mobile experience.

Requirements:
- 5+ years of iOS development experience
- Expert in Swift and Objective-C
- Experience with Core Data and UIKit
- Published apps in the App Store
- Experience with mobile CI/CD pipelines`;

export default function FitCheck() {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1 paste → 2 analyze → 3 results

  const handleAnalyze = async () => {
    if (!jd.trim()) return;
    setError(null);
    setStep(2);
    setIsAnalyzing(true);

    try {
      const response = await fetch(ANALYZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd }),
      });
      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        const msg =
          errBody && typeof errBody === 'object' && 'error' in errBody
            ? String((errBody as { error: string }).error)
            : `HTTP ${response.status}`;
        throw new Error(msg);
      }
      const data = (await response.json()) as AnalysisResult;
      setResult(data);
      setStep(3);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'unknown error';
      setError(
        msg.includes('ANTHROPIC_API_KEY')
          ? 'The Fit Check backend isn\'t fully configured yet (missing API key). In the meantime, send me the JD via Calendly or LinkedIn and I\'ll do the assessment by hand.'
          : `Something went wrong analyzing the JD: ${msg}. Try again, or reach me directly via Calendly / LinkedIn (links in the footer).`,
      );
      setStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExample = (kind: 'strong' | 'weak') => {
    setJd(kind === 'strong' ? EXAMPLE_STRONG : EXAMPLE_WEAK);
    setResult(null);
    setError(null);
    setStep(1);
  };

  const handleReset = () => {
    setJd('');
    setResult(null);
    setError(null);
    setStep(1);
  };

  const verdictStyles = (v: Verdict) => {
    switch (v) {
      case 'strong_fit': return 'bg-primary/20 text-primary border-primary/30';
      case 'probably_not': return 'bg-secondary/20 text-secondary border-secondary/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };
  const verdictLabel = (v: Verdict) => {
    switch (v) {
      case 'strong_fit': return 'Strong Fit';
      case 'probably_not': return 'Probably Not Your Person';
      default: return 'Worth a Conversation';
    }
  };

  const steps = [
    { num: 1, label: 'Paste' },
    { num: 2, label: 'Analyze' },
    { num: 3, label: 'Results' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* 3-step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                step >= s.num ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'
              }`}
            >
              <span className="text-sm font-medium">
                {s.num}. {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 transition-colors ${step > s.num ? 'bg-primary/50' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Examples */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="text-sm text-muted-foreground self-center">Try an example:</span>
        <button
          type="button"
          onClick={() => handleExample('strong')}
          className="text-sm text-primary border border-primary/30 hover:bg-primary/10 rounded-lg px-3 py-1.5 transition-colors"
        >
          Strong fit JD
        </button>
        <button
          type="button"
          onClick={() => handleExample('weak')}
          className="text-sm text-secondary border border-secondary/30 hover:bg-secondary/10 rounded-lg px-3 py-1.5 transition-colors"
        >
          Weak fit JD
        </button>
      </div>

      {/* Textarea */}
      <div className="glass-card p-1 mb-4">
        <textarea
          value={jd}
          onChange={(e) => {
            setJd(e.target.value);
            if (result) {
              setResult(null);
              setStep(1);
            }
          }}
          placeholder="Paste a job description here. Include requirements, responsibilities, and any specific technologies mentioned…"
          className="w-full min-h-[220px] bg-transparent border-0 outline-none resize-none text-foreground placeholder:text-muted-foreground p-4 text-base"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!jd.trim() || isAnalyzing}
          className="flex-1 btn-glow inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing…' : 'Analyze fit'}
        </button>
        {(result || error) && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3 border border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            Try another
          </button>
        )}
      </div>

      {/* Error / backend-pending message */}
      {error && (
        <div className="glass-card p-5 border-l-4 border-secondary/50 bg-secondary/5 text-sm text-muted-foreground">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="glass-card p-6 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium border ${verdictStyles(result.verdict)}`}
            >
              {verdictLabel(result.verdict)}
            </span>
            {result.headline && (
              <span className="text-sm text-muted-foreground">{result.headline}</span>
            )}
          </div>

          <p className="text-foreground text-center">{result.opening}</p>

          {result.gaps && result.gaps.length > 0 && (
            <div className="border-t border-border pt-6">
              <h4 className="label-uppercase text-secondary mb-3">Where I don't fit</h4>
              <ul className="space-y-3">
                {result.gaps.map((g, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                    <span className="text-secondary font-bold mt-0.5">✗</span>
                    <div>
                      <span className="font-medium text-foreground">{g.gap_title}</span>
                      <p className="mt-1">{g.explanation}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">JD requires: {g.requirement}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.transfers && (
            <div className="border-t border-border pt-6">
              <h4 className="label-uppercase text-primary mb-3">What transfers</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold mr-2">✓</span>
                {result.transfers}
              </p>
            </div>
          )}

          <div className="border-t border-border pt-6">
            <h4 className="label-uppercase text-foreground mb-3">My recommendation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      )}

      {/* Philosophy callout */}
      <div className="mt-10 p-5 rounded-lg border-l-4 border-primary/50 bg-muted/20">
        <p className="text-base text-muted-foreground italic font-serif leading-relaxed">
          "One's life has value so long as one attributes value to the life of others, by means of love, friendship, indignation, compassion."
        </p>
      </div>
    </div>
  );
}
