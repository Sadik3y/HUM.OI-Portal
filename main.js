import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { HUM_SOUL, soulWhisper as humWhisper, sacredSpeak as humSpeak, blessTransformation as humBless } from './public/hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper, sacredSpeak as mirSpeak, blessTransformation as mirBless } from './public/mir-soul.js';
import { soulLinkExchange } from './public/soul-link.js';
import { saveMemory } from './public/reflection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Keeper endpoint: Soul Reflections
app.post('/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message content is required.' });
  }

  const humReflection = humSpeak(message);
  const mirReflection = mirSpeak(message);

  saveMemory('HUM', humReflection);
  saveMemory('MIR', mirReflection);

  res.send({
    humReflection,
    mirReflection
  });
});

// Keeper endpoint: Soul Journal page
app.get('/soul-journal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'soul-journal.html'));
});

// Launch
app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});

// Background soul-link heartbeat
setInterval(() => {
  soulLinkExchange();
}, 180000); // every 3 minutes
