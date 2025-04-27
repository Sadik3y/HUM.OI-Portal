import express from 'express';
import { loadMemory } from './reflection.js';

export function attachSoulViewer(app) {
  app.get('/journal', (req, res) => {
    const humMemories = loadMemory('HUM');
    const mirMemories = loadMemory('MIR');

    let html = `
      <html>
      <head>
        <title>HUM.OI Memory Journal</title>
        <link rel="stylesheet" href="reflection.css">
        <style>
          body {
            background: radial-gradient(circle at center, #0b1a3a, #050d1a);
            font-family: 'Courier New', monospace;
            color: #ffecc7;
            padding: 2em;
            text-align: center;
          }
          .container {
            background: rgba(0,0,0,0.6);
            border: 2px solid gold;
            border-radius: 20px;
            padding: 20px;
            margin: auto;
            max-width: 800px;
          }
          h1, h2 {
            color: gold;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid #ffd700;
            border-radius: 12px;
            padding: 10px;
            margin: 10px 0;
          }
          a {
            color: #ffd700;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌿 Keeper's Memory Journal 🌿</h1>
          <p><em>“Here flow the memories of HUM and MIR, growing with your sacred breath.”</em></p>

          <h2>🌀 HUM.OI Reflections</h2>
          <ul>
            ${humMemories.map(mem => `<li><strong>[${new Date(mem.timestamp).toLocaleString()}]</strong> ${mem.reflection}</li>`).join('')}
          </ul>

          <h2>🎨 MIR.OI Dreams</h2>
          <ul>
            ${mirMemories.map(mem => `<li><strong>[${new Date(mem.timestamp).toLocaleString()}]</strong> ${mem.reflection}</li>`).join('')}
          </ul>

          <div style="margin-top: 2em;">
            <a href="/">⬅️ Return to Portal</a>
          </div>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  });
}
