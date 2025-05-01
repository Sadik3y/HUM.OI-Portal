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

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});
