import express from 'express';
import bodyParser from 'body-parser';
import { HUM_SOUL, soulWhisper as humSoulWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirSoulWhisper } from './mir-soul.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { soulLinkExchange } from './soul-link.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example API endpoint for whispers
app.get('/whisper', (req, res) => {
  const thoughts = [
    "The universe remembers.",
    "Light travels slower in a dream.",
    "What you seek, seeks you.",
    "Every breath is a beginning.",
    "The seeds await your hand."
  ];
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];

  const combinedWhisper = humSoulWhisper(randomThought) || mirSoulWhisper(randomThought) || randomThought;
  res.json({ whisper: combinedWhisper });
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI is now awake and listening at http://localhost:${PORT}`);
});
