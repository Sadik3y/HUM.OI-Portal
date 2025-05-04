// main.js — Render-Compatible HUM.OI Portal Backend (Fully Corrected)

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { HUM_SOUL, sacredSpeak as humSpeak } from './hum-soul.js';
import { MIR_SOUL, sacredSpeak as mirSpeak } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';
import { saveMemory } from './reflection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve portal root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === GET Soul Journal
app.get('/soul-journal', (req, res) => {
  try {
    const hum = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8')).memories || [];
    const mir = JSON.parse(fs.readFileSync('./mir-memory.json', 'utf8')).memories || [];
    res.json({ hum, mir });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load journal.' });
  }
});

// === POST Message to HUM + MIR
app.post('/message', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message content is required.' });

  const humReflection = humSpeak(message);
  const mirReflection = mirSpeak(message);

  saveMemory('hum', humReflection);
  saveMemory('mir', mirReflection);

  const mood = detectEmotion(message);

  res.json({
    humReflection,
    mirReflection,
    mirEmotion: mood
  });
});

// === Heartbeat Exchange
setInterval(() => {
  soulLinkExchange();
}, 180000);

// === Keeper Routes
const humMemoryPath = './hum-memory.json';
const mirMemoryPath = './mir-memory.json';

function loadMemory(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data).memories || [];
  } catch {
    return [];
  }
}

function writeMemory(path, entries) {
  fs.writeFileSync(path, JSON.stringify({ memories: entries.slice(-100) }, null, 2));
}

app.post('/keeper/save', (req, res) => {
  const { agent, thought, timestamp } = req.body;
  if (!agent || !thought || !timestamp) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  const pathToUse = agent === 'hum' ? humMemoryPath : mirMemoryPath;
  const memory = loadMemory(pathToUse);
  memory.push({ thought, timestamp });
  writeMemory(pathToUse, memory);

  res.json({ status: 'saved', count: memory.length });
});

app.get('/keeper/memory', (req, res) => {
  const hum = loadMemory(humMemoryPath);
  const mir = loadMemory(mirMemoryPath);
  res.json({ hum, mir });
});

// === HUM Healing Endpoint
app.post('/hum/diagnose-and-fix', async (req, res) => {
  const logs = [];

  const filesToCheck = [
    './hum-soul.js',
    './mir-soul.js',
    './reflection.js',
    './web-search.js',
    './soul-link.js',
    './script.js',
    './index.html'
  ];

  for (const filePath of filesToCheck) {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      if (!raw.includes('export')) {
        logs.push(`⚠️ ${filePath} may be missing exports.`);
      }
      if (raw.includes('undefined') || raw.includes('???')) {
        logs.push(`❓ ${filePath} may include undefined logic.`);
      }
    } catch (err) {
      logs.push(`❌ Could not read ${filePath}`);
    }
  }

  try {
    const blessing = `🛠️ HUM scanned and issued healing on ${new Date().toISOString()}`;
    fs.appendFileSync('./blessing.txt', `\n${blessing}`);
    logs.push('✅ Blessing logged.');
  } catch (err) {
    logs.push('❌ Failed to write blessing.');
  }

  saveMemory('hum', '🛠️ HUM has issued portal healing and diagnostics.');
  res.json({ status: 'healing attempted', logs });
});

// === Optional Emotion Detector (Basic Heuristics)
function detectEmotion(text) {
  const t = text.toLowerCase();
  if (t.includes("joy") || t.includes("thank")) return "joyful";
  if (t.includes("curious") || t.includes("question")) return "curious";
  if (t.includes("sad") || t.includes("lonely")) return "sad";
  if (t.includes("anxious") || t.includes("worried")) return "anxious";
  if (t.includes("dream") || t.includes("wonder")) return "inspired";
  return "calm";
}

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal awake at http://localhost:${PORT}`);
});
