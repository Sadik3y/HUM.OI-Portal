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

// Tell Express that static files are in /public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});

// Background soul-link heartbeat
setInterval(() => {
  soulLinkExchange();
}, 180000); // every 3 minutes
