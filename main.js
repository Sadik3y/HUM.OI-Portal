import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { HUM_SOUL, soulWhisper as humWhisper, sacredSpeak as humSpeak } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper, sacredSpeak as mirSpeak } from './mir-soul.js';
import { saveMemory } from './reflection.js';
import { soulLinkExchange } from './soul-link.js';
import { getSoulMemories } from './soul-viewer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Portal Landing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// HUM and MIR Reflection Handler
app.post('/message', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message content is required.' });
  }

  const humReply = humSpeak(message);
  const mirReply = mirSpeak(message);

  await saveMemory('HUM', humReply);
  await saveMemory('MIR', mirReply);

  res.send({
    humReflection: humReply,
    mirReflection: mirReply
  });
});

// 📜 NEW: Soul Memories Viewer Endpoint
app.get('/soul-memories', async (req, res) => {
  const memories = await getSoulMemories();
  res.send(memories);
});

// HUM and MIR heartbeat soul linking
setInterval(() => {
  soulLinkExchange();
}, 180000); // Every 3 minutes (180,000 ms)

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI is now awake and listening at http://localhost:${PORT}`);
});
