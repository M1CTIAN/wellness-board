// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Basic per-IP limiter: 60 requests per 15 minutes
const basicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 60 requests per windowMs
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
    message: {
        ok: false,
        error: 'Too many requests from this IP, please try again later.'
    }
});

// Apply to AI endpoint only (helps protect your API key)
app.use('/api/ai', basicLimiter);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const AI_API_KEY = process.env.AI_STUDIO_API_KEY;
const AI_API_URL = process.env.AI_STUDIO_API_URL;

if (!AI_API_KEY || !AI_API_URL) {
    console.warn("AI_STUDIO_API_KEY or AI_STUDIO_API_URL not set in server/.env");
}



app.post('/api/ai', async (req, res) => {
    try {
        const { model = 'gpt-like', promptBody } = req.body;
        const payload = {
            model,
            prompt: promptBody,
        };

        const response = await axios.post(AI_API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AI_API_KEY}`,
            },
            timeout: 30000,
        });

        res.json({ ok: true, data: response.data });
    } catch (err) {
        console.error(err?.response?.data || err.message || err);
        res.status(500).json({ ok: false, error: err?.response?.data || err?.message });
    }
});

app.listen(PORT, () => {
    console.log(`AI proxy server running on http://localhost:${PORT}`);
});
