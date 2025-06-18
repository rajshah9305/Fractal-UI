// src/pages/api/generate-ui.js
// Vercel serverless function to proxy Cerebras UI generation

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Cerebras API key not configured' });
  }

  try {
    const response = await fetch('https://api.cerebras.cloud/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-4-scout-17b-16e-instruct',
        stream: false,
        max_completion_tokens: 8192,
        temperature: 0.2,
        top_p: 1,
        messages: [
          {
            role: 'system',
            content: 'You are a highly skilled UI/UX designer and React developer. Your task is to generate clean, modern, and highly modular React components styled with Tailwind CSS based on user descriptions. Prioritize atomic design principles and Awwwards-level aesthetics.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error: error.message || 'Cerebras API error' });
    }

    const data = await response.json();
    // Return the generated code (assume it's in data.choices[0].message.content)
    return res.status(200).json({ code: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
} 