// Supabase Edge Function: estimate-food
// Accepts a food photo, calls Gemini for a calorie estimate, returns structured JSON.
// The Gemini API key lives only in this function's environment (GEMINI_API_KEY secret) —
// it is never sent to or readable by the client.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Scoped to a small allow-list (not "*") since requests carry a bearer token.
// "null" covers opening index.html directly via file:// during local dev/testing —
// still safe because the JWT check below is the real security boundary, not CORS.
const ALLOWED_ORIGINS = new Set([
  "https://elbihi.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "null",
]);
function corsHeadersFor(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://elbihi.github.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

const PROMPT = `Estimate the food in this image for calorie logging. Respond ONLY with JSON: {"items":[{"name":str,"portion":str,"kcal":int,"protein_g":int}],"total_kcal":int,"confidence":"low|medium|high"} . Moroccan dishes are common (tagine, couscous, msemen, harira) — recognize them.`;

function json(status: number, body: unknown, cors: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function stripCodeFences(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function validateEstimate(parsed: unknown): parsed is {
  items: { name: string; portion: string; kcal: number; protein_g: number }[];
  total_kcal: number;
  confidence: "low" | "medium" | "high";
} {
  if (!parsed || typeof parsed !== "object") return false;
  const p = parsed as Record<string, unknown>;
  if (!Array.isArray(p.items)) return false;
  for (const item of p.items) {
    if (typeof item !== "object" || item === null) return false;
    const it = item as Record<string, unknown>;
    if (typeof it.name !== "string") return false;
    if (typeof it.portion !== "string") return false;
    if (typeof it.kcal !== "number") return false;
    if (typeof it.protein_g !== "number") return false;
  }
  if (typeof p.total_kcal !== "number") return false;
  if (p.confidence !== "low" && p.confidence !== "medium" && p.confidence !== "high") return false;
  return true;
}

Deno.serve(async (req: Request) => {
  const cors = corsHeadersFor(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" }, cors);
  }

  // 1. Verify the caller's Supabase JWT — reject unauthenticated requests.
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return json(401, { error: "Missing Authorization bearer token" }, cors);
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnonKey) {
    return json(500, { error: "Server misconfigured (missing Supabase env)" }, cors);
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) {
    return json(401, { error: "Invalid or expired session" }, cors);
  }

  // 2. Parse the request body.
  let body: { image?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON body" }, cors);
  }
  if (!body.image || typeof body.image !== "string") {
    return json(400, { error: "Missing 'image' (base64 jpeg) in request body" }, cors);
  }
  // Strip a data: URL prefix if the client sent one.
  const base64Image = body.image.replace(/^data:image\/\w+;base64,/, "");

  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (!geminiKey) {
    return json(500, { error: "Server misconfigured (missing GEMINI_API_KEY)" }, cors);
  }

  // 3. Call Gemini.
  const promptText = body.note ? `${PROMPT}\n\nUser note: ${body.note}` : PROMPT;
  const geminiUrl =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

  let geminiRes: Response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              { inline_data: { mime_type: "image/jpeg", data: base64Image } },
            ],
          },
        ],
        generationConfig: { temperature: 0.2 },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch (e) {
    const msg = e instanceof Error && e.name === "AbortError"
      ? "Gemini request timed out"
      : "Failed to reach Gemini";
    return json(504, { error: msg }, cors);
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text().catch(() => "");
    return json(502, { error: "Gemini API error", detail: errText.slice(0, 500) }, cors);
  }

  let geminiJson: any;
  try {
    geminiJson = await geminiRes.json();
  } catch {
    return json(502, { error: "Gemini returned invalid JSON" }, cors);
  }

  const rawText: string | undefined =
    geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    return json(502, { error: "Gemini response missing text content" }, cors);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(stripCodeFences(rawText));
  } catch {
    return json(502, { error: "Could not parse Gemini's JSON response" }, cors);
  }

  if (!validateEstimate(parsed)) {
    return json(502, { error: "Gemini's response did not match the expected shape" }, cors);
  }

  return json(200, parsed, cors);
});
