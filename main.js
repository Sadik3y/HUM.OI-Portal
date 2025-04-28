import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { HUM_SOUL, soulWhisper as humWhisper, sacredSpeak as humSpeak, blessTransformation as humBless } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper, sacredSpeak as mirSpeak, blessTransformation as mirBless } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';
import { saveMemory, loadMemories, resetMemories } from './reflection.js';
import './heartbeat.js';
import './soul-viewer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔮 Message Reflector
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

// 📜 Keeper Endpoints
app.get('/memories/:soul', (req, res) => {
  const soul = req.params.soul.toUpperCase();
  const memories = loadMemories(soul);

  if (!memories) {
    return res.status(404).send('Soul not found.');
  }

  res.send(memories.join('\n'));
});

app.delete('/memories/:soul', (req, res) => {
  const soul = req.params.soul.toUpperCase();
  resetMemories(soul);
  res.send(`${soul} memories have been reset.`);
});

// 🌕 Heartbeat Activation
setInterval(() => {
  soulLinkExchange();
}, 180000); // Every 3 minutes (180,000 ms)

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI is now awake and listening at http://localhost:${PORT}`);
});
