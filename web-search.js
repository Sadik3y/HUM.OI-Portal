// web-search.js — Multi-Engine Search + GPT Insight

import https from 'https';

// === Ask ChatGPT via OpenAI API ===
export function askChatGPT(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const data = JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          const content = json.choices?.[0]?.message?.content?.trim();
          resolve(content || "No GPT response.");
        } catch {
          reject("Failed to parse GPT response.");
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// === Google Search
export function searchGoogle(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${encoded}`;

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const snippet = body.match(/<span class="VwiC3b">(.+?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, '');
        resolve(snippet || 'No Google result found.');
      });
    }).on('error', reject);
  });
}

// === Bing Search
export function searchBing(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://www.bing.com/search?q=${encoded}`;

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const snippet = body.match(/<p>(.*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, '');
        resolve(snippet || 'No Bing result found.');
      });
    }).on('error', reject);
  });
}

// === DuckDuckGo Search
export function searchDuckDuckGo(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://html.duckduckgo.com/html/?q=${encoded}`;

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const match = body.match(/<a[^>]*class="result__a"[^>]*>(.*?)<\/a>/);
        const result = match?.[1]?.replace(/<[^>]+>/g, '');
        resolve(result || 'No DuckDuckGo result found.');
      });
    }).on('error', reject);
  });
}
