/**
 * <AskAIDrawer /> — React island mounted in BaseLayout.
 *
 * Hydrates on page load (client:load) and listens for clicks on any
 * element carrying `data-ask-ai-trigger` (the nav button, footer button,
 * etc.). Opens a right-side drawer with the chat UI.
 *
 * Backend: defaults to /api/chat (the Vercel Edge function). Override with
 * PUBLIC_CHAT_URL env var if you want to point at a different deployment.
 *
 * Expected SSE format (matches /api/chat):
 *   data: {"text":"Hello "}
 *   data: {"text":"world"}
 *   data: [DONE]
 *
 * If the call fails (e.g. backend missing in local dev), the UI shows a
 * friendly message pointing the visitor at Calendly / LinkedIn.
 */
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's your biggest weakness?",
  'Tell me about a project that failed.',
  'Why are you open to new roles?',
  'What would your last manager say about you?',
];

// Default to our Vercel Edge function; override per-environment if needed.
const CHAT_URL = (import.meta as any).env?.PUBLIC_CHAT_URL ?? '/api/chat';

export default function AskAIDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Wire up trigger buttons (nav + any future ones with data-ask-ai-trigger).
  useEffect(() => {
    const open = () => setIsOpen(true);
    const triggers = document.querySelectorAll<HTMLElement>('[data-ask-ai-trigger]');
    triggers.forEach((el) => el.addEventListener('click', open));
    return () => triggers.forEach((el) => el.removeEventListener('click', open));
  }, []);

  // Reset chat each time the drawer opens.
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInput('');
    }
  }, [isOpen]);

  // ESC closes the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Scroll to bottom on new message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.body) throw new Error('No response body');

      // Stream our SSE format: `data: {"text":"..."}\n\n` … `data: [DONE]\n\n`
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = (Date.now() + 1).toString();
      let assistantContent = '';
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '' },
      ]);

      let buffer = '';
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, idx).replace(/\r$/, '');
          buffer = buffer.slice(idx + 1);
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(payload) as { text?: string; error?: string };
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.text) {
              assistantContent += parsed.text;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m)),
              );
            }
          } catch (parseErr) {
            // Re-throw JSON parse errors only on full lines we expected to parse.
            // Genuine partial-JSON splits on chunked reads are rare with our small
            // payloads, but we surface unexpected errors rather than silently dropping.
            if (parseErr instanceof Error && parseErr.message !== payload) {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      console.error('chat error', err);
      setMessages((prev) => [
        ...prev.filter((m) => m.content !== ''),
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content:
            "Sorry — I couldn't reach the chat backend just now. You can book a call via Calendly or message me on LinkedIn (links in the footer).",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] glass-card rounded-l-xl z-50 flex flex-col border-l border-border shadow-2xl"
        style={{ animation: 'slide-in-right 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="font-serif font-semibold text-foreground">Ask Me Anything</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Messages / empty state */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-6">
                Ask me anything about my experience, skills, or approach.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    disabled={isTyping}
                    className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 border border-border disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}
                >
                  {m.content || (isTyping && m.role === 'assistant' ? '…' : '')}
                </div>
              </div>
            ))
          )}
          {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 border-t border-border flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question…"
            disabled={isTyping}
            className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full p-2.5 transition-colors disabled:opacity-50"
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </form>
      </aside>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
