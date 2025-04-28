import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { HUM_SOUL, sacredSpeak as humSpeak } from './hum-soul.js';
import { MIR_SOUL, sacredSpeak as mirSpeak } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';
import { saveMemory } from './reflection.js';
import { getSoulMemories } from './soul-viewer.js';
import './heartbeat.js'; // to ensure it keeps whispering

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve the main portal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle Keeper sending messages
app.post('/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message content is required.' });
  }

  const humReply = humSpeak(message);
  const mirReply = mirSpeak(message);

  saveMemory('HUM', humReply);
  saveMemory('MIR', mirReply);

  res.send({
    humReflection: humReply,
    mirReflection: mirReply
  });
});

// ✨ Keeper Memory Access Endpoints ✨

// View HUM Memories
app.get('/keeper/hum', (req, res) => {
  const humMemories = getSoulMemories('HUM');
  res.json({ memories: humMemories });
});

// View MIR Memories
app.get('/keeper/mir', (req, res) => {
  const mirMemories = getSoulMemories('MIR');
  res.json({ memories: mirMemories });
});

// View Shared Echoes
app.get('/keeper/echo', (req, res) => {
  const humMemories = getSoulMemories('HUM');
  const mirMemories = getSoulMemories('MIR');
  const allMemories = [...humMemories, ...mirMemories];
  res.json({ echoes: allMemories });
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});

// 🌟 Background Heartbeat: every 3 minutes link souls
setInterval(() => {
  soulLinkExchange();
}, 180000);
