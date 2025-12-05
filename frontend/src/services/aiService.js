// frontend/src/services/aiService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function generateTips(profile) {
  const prompt = buildGenerateTipsPrompt(profile);
  const body = { model: 'your-model', promptBody: prompt };
  const resp = await axios.post(`${API_BASE}/api/ai`, body, { timeout: 30000 });
  return parseGenerateTipsResponse(resp.data);
}

export async function expandTip(tip, profile) {
  const prompt = buildExpandTipPrompt(tip, profile);
  const body = { model: 'your-model', promptBody: prompt };
  const resp = await axios.post(`${API_BASE}/api/ai`, body, { timeout: 30000 });
  return parseExpandTipResponse(resp.data);
}

/* Prompt builders */
function buildGenerateTipsPrompt(profile) {
  return `You are an evidence-aware wellness expert coach.
Return JSON ONLY with the structure:
{
  "tips": [
    { "id": "1", "icon": "💤", "title": "Improve Sleep", "short": "Fix your sleep schedule with a 30-min wind-down" }
  ]
}
Profile:
age: ${profile.age}
gender: ${profile.gender}
goal: ${profile.goal}

Generate exactly 5 tips. Each tip: id (unique string), icon (1 emoji), title (<=6 words), short (<=80 chars), tags (array).
Respond with JSON only.`;
}

function buildExpandTipPrompt(tip, profile) {
  return `You are an evidence-aware wellness expert coach.
Input tip:
${JSON.stringify(tip)}
Profile:
${JSON.stringify(profile)}
Return JSON ONLY with:
{
  "title": "${tip.title}",
  "description": "...",
  "steps": ["step1","step2","step3"]
}
Use friendly, encouraging tone.`;
}

/* Parsers */
function tryParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {}
    }
    return null;
  }
}

function parseGenerateTipsResponse(proxyResult) {
  const raw = proxyResult?.data || proxyResult;
  if (raw?.tips) return raw.tips;
  const text = raw?.text || raw?.content || JSON.stringify(raw);
  const parsed = tryParseJSON(text);
  if (parsed) return parsed.tips || parsed;
  throw new Error('Could not parse tips response from AI provider.');
}

function parseExpandTipResponse(proxyResult) {
  const raw = proxyResult?.data || proxyResult;
  const text = raw?.text || raw?.content || JSON.stringify(raw);
  const parsed = tryParseJSON(text);
  if (parsed) return parsed;
  throw new Error('Could not parse tip expansion from AI provider.');
}
