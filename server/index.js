require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require("@google/genai");
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Google GenAI Client
// Support both variable names (user has AI_STUDIO_API_KEY in .env)
const apiKey = process.env.GEMINI_API_KEY || process.env.AI_STUDIO_API_KEY;

if (!apiKey) {
    console.error("CRITICAL ERROR: API Key not found. Please set GEMINI_API_KEY or AI_STUDIO_API_KEY in server/.env");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Helper to clean JSON from Markdown code blocks
const cleanJson = (text) => {
    try {
        // Remove ```json ... ``` or ``` ... ``` wrappers
        return text.replace(/```json\n?|```/g, '').trim();
    } catch (e) {
        return text;
    }
};

// POST /api/generate-tips
app.post('/api/generate-tips', async (req, res) => {
    try {
        const { profile, context } = req.body;
        
        if (!profile || !profile.age || !profile.gender || !profile.goal) {
            return res.status(400).json({ ok: false, error: 'Missing profile information' });
        }

        const dayContext = context?.day ? `Today is ${context.day}.` : '';

        const prompt = `
            You are a wellness expert. Generate 5 personalized wellness tips for a ${profile.age}-year-old ${profile.gender} whose goal is "${profile.goal}".
            ${dayContext}
            
            Rules:
            1. Return ONLY valid JSON. No markdown formatting.
            2. The JSON must match this shape exactly:
               {
                 "tips": [
                   { 
                     "id": "unique_string", 
                     "title": "Short catchy title", 
                     "short": "One sentence summary", 
                     "icon": "Single emoji", 
                     "category": "One word category (e.g., Sleep, Diet, Mind)" 
                   }
                 ]
               }
            3. Provide exactly 5 tips.
            4. Tone: Calm, supportive, non-medical, friendly.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
            }
        });

        const candidate = response.text;
        if (!candidate) {
            throw new Error('No response from AI');
        }

        const jsonStr = cleanJson(candidate);
        const parsed = JSON.parse(jsonStr);

        res.json({ ok: true, tips: parsed.tips });

    } catch (error) {
        console.error('Generate Tips Error:', error?.message || error);
        res.status(500).json({ 
            ok: false, 
            error: 'Failed to generate tips. Please try again.' 
        });
    }
});

// POST /api/expand-tip
app.post('/api/expand-tip', async (req, res) => {
    try {
        const { profile, tip } = req.body;

        if (!profile || !tip) {
            return res.status(400).json({ ok: false, error: 'Missing profile or tip information' });
        }

        const prompt = `
            You are a wellness expert. Expand on this tip for a ${profile.age}-year-old ${profile.gender} with the goal "${profile.goal}".
            
            Tip: "${tip.title}" - ${tip.short}
            
            Rules:
            1. Return ONLY valid JSON. No markdown formatting.
            2. The JSON must match this shape exactly:
               {
                 "description": "100-150 word friendly, encouraging explanation of why this helps.",
                 "steps": ["Step 1...", "Step 2...", "Step 3..."]
               }
            3. Provide 3-5 actionable steps.
            4. Tone: Calm, supportive, non-medical.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
            }
        });

        const candidate = response.text;
        if (!candidate) {
            throw new Error('No response from AI');
        }

        const jsonStr = cleanJson(candidate);
        const parsed = JSON.parse(jsonStr);

        res.json({ ok: true, detail: parsed });

    } catch (error) {
        console.error('Expand Tip Error:', error?.message || error);
        res.status(500).json({ 
            ok: false, 
            error: 'Failed to expand tip. Please try again.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
