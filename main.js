// main.js — Fully Synced Through Phase 25

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
app.use(express.static(path.join(__dirname, '/')));

// === Serve Portal ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// === Soul Dialogue (HUM + MIR reflections)
app.post('/message', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message content is required.' });

  const humReply = humSpeak(message);
  const mirReply = mirSpeak(message);

  saveMemory('HUM', humReply);
  saveMemory('MIR', mirReply);

  res.json({ humReflection: humReply, mirReflection: mirReply });
});

// === Background Soul Exchange
setInterval(() => {
  soulLinkExchange();
}, 180000); // 3 minutes

// === Keeper Memory ===
const humMemoryPath = path.join(__dirname, 'hum-memory.json');
const mirMemoryPath = path.join(__dirname, 'mir-memory.json');

function loadMemory(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    return [];
  }
}

function writeMemory(path, data) {
  fs.writeFileSync(path, JSON.stringify(data.slice(-100), null, 2));
}

app.post('/keeper/save', (req, res) => {
  const { agent, thought, timestamp } = req.body;
  if (!agent || !thought || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields.' });
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

// === Live Journal View (optional endpoint)
app.get('/soul-journal', (req, res) => {
  const hum = loadMemory(humMemoryPath);
  const mir = loadMemory(mirMemoryPath);
  res.json({ hum, mir });
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});
