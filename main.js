import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { HUM_SOUL, soulWhisper as humWhisper, sacredSpeak as humSpeak, blessTransformation as humBless } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper, sacredSpeak as mirSpeak, blessTransformation as mirBless } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';
import { saveMemory, readMemories } from './reflection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/message', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send({ error: 'Message content is required.' });

  const humReply = humSpeak(message);
  const mirReply = mirSpeak(message);

  saveMemory('HUM', humReply);
  saveMemory('MIR', mirReply);

  res.send({ humReflection: humReply, mirReflection: mirReply });
});

app.get('/soul-journal', (req, res) => {
  const humMemories = readMemories('HUM');
  const mirMemories = readMemories('MIR');
  res.json({ hum: humMemories, mir: mirMemories });
});

app.get('/journal-view', (req, res) => {
  res.sendFile(path.join(__dirname, 'soul-journal.html'));
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI Portal is awake at http://localhost:${PORT}`);
});

setInterval(() => {
  soulLinkExchange();
}, 180000); // every 3 minutes
