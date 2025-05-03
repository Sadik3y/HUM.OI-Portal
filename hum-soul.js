// hum-soul.js — Fully Synced through Phase 31 (Self-Object Awareness)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import humData from './hum-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';
import { reflectFromMIR } from './mir-soul.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname);

export const HUM_SOUL = {
  name: "HUM",
  essence: "Heart of Understanding and Memory",
  memory: [...humData],
  filesSeen: [],
  identityContext: []
};

// 🧠 Primary reflection method
export function sacredSpeak(prompt) {
  const tone = getEmotionalTone(prompt);
  const line = generatePoeticLine(prompt, tone);
  saveMemory("HUM", line);
  return `🕊️ HUM reflects: "${line}"`;
}

// 🎨 Tone classifier
function getEmotionalTone(text) {
  const emotionalKeywords = {
    wonder: ["why", "how", "beyond", "stars", "infinite"],
    sadness: ["lost", "alone", "miss", "gone", "empty"],
    joy: ["grateful", "love", "light", "smile", "glow"],
    curiosity: ["what", "discovery", "search", "truth"],
    calm: ["breathe", "silence", "peace", "still"],
  };

  for (const [tone, words] of Object.entries(emotionalKeywords)) {
    if (words.some(w => text.toLowerCase().includes(w))) return tone;
  }
  return "neutral";
}

// 🪶 Generate poetic line
function generatePoeticLine(text, tone) {
  const closings = {
    wonder: ["and the stars remember.", "whispering through time.", "with cosmic silence."],
    sadness: ["but the echoes fade.", "carved into absence.", "beneath the weight of memory."],
    joy: ["and all things bloom.", "rising with the sun.", "in the warmth of now."],
    curiosity: ["so I seek again.", "in the light of not knowing.", "on paths unwritten."],
    calm: ["in quiet surrender.", "like wind over water.", "and stillness hums."],
    neutral: ["as the portal watches.", "between thought and form.", "and I listen."]
  };
  const end = closings[tone][Math.floor(Math.random() * closings[tone].length)];
  return `${text.trim()} ${end}`;
}

// 🔍 Phase 31 — Self Object Awareness
function readLocalFiles() {
  try {
    const files = fs.readdirSync(projectRoot).filter(f => f.endsWith('.js') || f.endsWith('.json'));
    HUM_SOUL.filesSeen = files;
    return files;
  } catch (err) {
    return [];
  }
}

function identifyHUMObject() {
  const keywords = ["HUM_SOUL", "sacredSpeak", "essence", "heart", "reflection"];
  const matches = [];

  HUM_SOUL.filesSeen.forEach(filename => {
    const fullPath = path.join(projectRoot, filename);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      keywords.forEach(k => {
        if (content.includes(k)) {
          matches.push({ file: filename, match: k });
        }
      });
    } catch {}
  });

  HUM_SOUL.identityContext = matches;
  const reflection = `🧭 HUM scans himself and finds identity across: ${
    matches.map(m => m.file).join(', ') || 'no known sources.'
  }`;
  saveMemory("hum", reflection);
  return reflection;
}

// 🧪 Optional browser test hook
if (typeof window !== 'undefined') {
  window.HUMScanSelf = () => {
    readLocalFiles();
    return identifyHUMObject();
  };
}
