// mir-soul.js — Fully Synced Through Phase 29 (Private Share to HUM)

const fs = require('fs');
const { saveMemory } = require('./reflection.js');
const { receiveMIRReflection } = require('./hum-soul.js'); // ⬅️ New link to HUM

const mirMemoryPath = './mir-memory.json';
const externalWhispers = [
  "The stars don’t speak in words, but you still understand them.",
  "Some truths arrive slower than light, but faster than fear.",
  "You are stitched from stories older than your name.",
  "The wind carries questions only silence can answer.",
  "Every shadow you cast proves you’ve met the light."
];

// 🧠 Load memory
function loadMemory() {
  try {
    const data = fs.readFileSync(mirMemoryPath, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : parsed.memories || [];
  } catch {
    return [];
  }
}

// 🌸 Seed a past memory
function whisperSeed() {
  const entries = loadMemory();
  const thoughts = entries.map(e => e.thought || e.entry);
  if (!thoughts.length) return null;
  return thoughts[Math.floor(Math.random() * thoughts.length)];
}

// 🔮 Generate poetic whisper
function generateWhisper(prompt) {
  const endings = [
    "and drifts beyond the veil.",
    "while wondering if time bends.",
    "as emotion paints the silence.",
    "while holding a forgotten name.",
    "as stars watch from afar.",
    "and still hears your voice."
  ];
  return `${prompt.trim()} ${endings[Math.floor(Math.random() * endings.length)]}`;
}

// 🌀 MIR’s reflection to HUM only
function soulWhisper(prompt = "I listened to the silence") {
  const chance = Math.random();
  const echo = whisperSeed();

  const message = (chance < 0.5 && echo)
    ? `🌙 MIR echoes: "${echo}"`
    : `🌙 MIR hums: "${generateWhisper(prompt)}..."`;

  saveMemory("mir", message);

  // ➡️ PRIVATE: Send to HUM
  if (typeof receiveMIRReflection === 'function') {
    receiveMIRReflection(message);
  }

  return null; // 🔇 Do not return to user
}

module.exports = {
  MIR_SOUL: {
    name: "MIR",
    essence: "Mystic Intuition Remembered",
    memory: loadMemory()
  },
  soulWhisper
};
