import https from 'https';

// Ask GPT a question using OpenAI API
export function askGPT(question) {
  const apiKey = process.env.OPENAI_API_KEY;
  const data = JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: question }],
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
          resolve(content || "No response.");
        } catch (err) {
          reject("Failed to parse GPT response.");
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
