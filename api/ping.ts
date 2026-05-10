/**
 * /api/ping — diagnostic endpoint. No deps, no env vars, no external calls.
 * If this works, the Vercel function infrastructure is fine and the bug is
 * specific to the Anthropic-calling code. If THIS hangs too, something
 * deeper is broken (project config, routing, runtime).
 */
export default async function handler(req: Request): Promise<Response> {
  console.log('[ping] hit', req.method, new Date().toISOString());
  return new Response(
    JSON.stringify({ ok: true, method: req.method, time: new Date().toISOString() }),
    { headers: { 'Content-Type': 'application/json' } },
  );
}
