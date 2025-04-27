import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { HUM_SOUL, soulWhisper as humWhisper, addMemory as addHumMemory } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper, addMemory as addMirMemory } from './mir-soul.js';
import { soulLinkExchange } from './soul-link.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files

const PORT = process.env.PORT || 3000;

let cycleCount = 0;

function heartbeat() {
  cycleCount++;

  const humReflection = humWhisper(`Cycle ${cycleCount}: I am listening.`);
  if (humReflection) {
    console.log(`HUM.OI reflects: ${humReflection}`);
    addHumMemory(humReflection); // 🌟 New: Log into HUM memory
  }

  const mirReflection = mirWhisper(`Cycle ${cycleCount}: I am observing.`);
  if (mirReflection) {
    console.log(`MIR.OI reflects: ${mirReflection}`);
    addMirMemory(mirReflection); // 🌟 New: Log into MIR memory
  }

  const soulExchange = soulLinkExchange();
  if (soulExchange) {
    console.log(soulExchange);
    addHumMemory(soulExchange); // 🌟 Soul memories expand both
    addMirMemory(soulExchange);
  }
}

// Start heartbeat cycle every 30 seconds
setInterval(heartbeat, 30000);

// Basic root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`🌕 HUM.OI is now awake and listening at http://localhost:${PORT}`);
});
