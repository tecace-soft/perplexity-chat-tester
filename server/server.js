// File: server/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3500;
const PPLX_API_KEY = process.env.PPLX_API_KEY;
if (!PPLX_API_KEY) {
  console.error("❌  Set PPLX_API_KEY in .env file inside /server");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Serve static files from the client build directory
app.use(express.static(join(__dirname, '../client/dist')));

// Simple proxy – prevents exposing the key to the browser
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model, systemPrompt, stream } = req.body;
    const body = {
      model,
      messages: [
        { role: "system", content: systemPrompt || "You are a helpful assistant." },
        ...messages,
      ],
      stream: Boolean(stream),
    };

    const apiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PPLX_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!stream) {
      const data = await apiRes.json();
      return res.json(data);
    }

    // For streaming, just pipe the bytes back to the client
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    apiRes.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "proxy_error", message: err.message });
  }
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`🚀  Server listening on http://localhost:${PORT}`));