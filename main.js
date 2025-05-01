import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { HUM_SOUL, sacredSpeak as humSpeak } from './hum-soul.js';
import { MIR_SOUL, sacredSpeak as mirSpeak } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';
import { saveMemory, getJournalEntries, saveJournalEntry } from './reflection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST to speak to both HUM and MIR
app.post('/message', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message content is required.' });

  const humReply = humSpeak(message);
  const mirReply = mirSpeak(message);

  saveMemory('HUM', humReply);
  saveMemory('MIR', mirReply);
  saveJournalEntry(`You: ${message}`);
  saveJournalEntry(`HUM: ${humReply}`);
  saveJournalEntry(`MIR: ${mirReply}`);

  res.json({ humReflection: humReply, mirReflection: mirReply });
});

// GET journal reflections
app.get('/journal', (req, res) => {
  const entries = getJournalEntries();
  res.json(entries);
});

// Background heartbeat
setInterval(() => {
  soulLinkExchange();
}, 180000);

// === Keeper Memory Paths ===
const humMemoryPath = path.join(__dirname, 'hum-memory.json');
const mirMemoryPath = path.join(__dirname, 'mir-memory.json');

// === Load memory from file
function loadMemory(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    return [];
  }
}

// === Save memory to file
function writeMemory(path, data) {
  fs.writeFileSync(path, JSON.stringify(data.slice(-100), null, 2));
}

// === POST /keeper/save
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

// === GET /keeper/memory
app.get('/keeper/memory', (req, res) => {
  const hum = loadMemory(humMemoryPath);
  const mir = loadMemory(mirMemoryPath);
  res.json({ hum, mir });
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});
