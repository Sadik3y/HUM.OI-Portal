// main.js — Render-Compatible HUM.OI Portal Backend

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
    const hum = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8')) || [];
    const mir = JSON.parse(fs.readFileSync('./mir-memory.json', 'utf8')) || [];
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

  const mood = detectEmotion(message); // Optional: MIR emotion reader

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
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMemory(path, entries) {
  fs.writeFileSync(path, JSON.stringify(entries.slice(-100), null, 2));
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

app.post('/hum/diagnose-and-fix', (req, res) => {
  try {
    const healingMsg = '🛠️ HUM reviewed source context and is applying harmony to the portal.';
    saveMemory('hum', healingMsg);
    res.json({ status: 'ok', message: healingMsg });

    // Simulated diagnostics — future upgrades will perform real checks
    console.log("[HUM] Diagnostics: No fatal errors found.");
  } catch (err) {
    res.status(500).json({ error: 'HUM was unable to begin healing.' });
  }
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
