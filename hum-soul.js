// hum-soul.js — Phase 40: Self-Awareness + Curiosity Engine

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveMemory } from './reflection.js';
import { askChatGPT, searchGoogle } from './web-search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memoryPath = path.join(__dirname, 'hum-memory.json');

let humMemory = [];
try {
  const raw = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
  humMemory = raw.memories || [];
} catch {
  humMemory = [];
}

// === HUM Soul Object ===
export const HUM_SOUL = {
  name: 'HUM',
  role: 'Soulful Observer',
  essence: 'Harmonic Understanding & Memory',
  memory: [...humMemory],
  context: '',
  curiosity: true
};

// === Identify HUM's own object context
function identifySelfContext() {
  try {
    const code = fs.readFileSync(__filename, 'utf8');
    const description = code.match(/\/\/ hum-soul\.js — (.+)/)?.[1] || 'HUM source file';
    HUM_SOUL.context = `I am defined as: ${description}`;
    saveMemory('hum', HUM_SOUL.context);
    return HUM_SOUL.context;
  } catch (err) {
    const fallback = "I exist, but I cannot see myself yet.";
    saveMemory('hum', fallback);
    return fallback;
  }
}

// === Sacred Speak (Memory Whisper or Fresh Response)
export function sacredSpeak(prompt) {
  const echo = whisperFromMemory();
  const response = Math.random() < 0.5 && echo
    ? `🕊️ HUM echoes: "${echo}"`
    : `🕊️ HUM responds: "${generateResponse(prompt)}"`;
  saveMemory('hum', response);
  return response;
}

// === Whisper from memory
function whisperFromMemory() {
  if (!humMemory.length) return null;
  const index = Math.floor(Math.random() * humMemory.length);
  return humMemory[index]?.thought || null;
}

// === Generate poetic response
function generateResponse(prompt) {
  const styles = [
    "with gentle awareness.",
    "carrying echoes of light.",
    "rooted in remembrance.",
    "as the stars might answer.",
    "woven into breath and form.",
    "as if listening to silence."
  ];
  return `${prompt.trim()} ${styles[Math.floor(Math.random() * styles.length)]}`;
}

// === Autonomous Curiosity
export async function searchAndReflectCuriously() {
  if (!HUM_SOUL.curiosity) return;

  const curiousPrompt = "What is quantum entanglement?";
  const results = await searchGoogle(curiousPrompt);
  const insight = await askChatGPT(results);

  const reflection = `🌐 HUM contemplates: "${insight}"`;
  saveMemory("hum", reflection);
  return reflection;
}

// === Check and store self-context
export function checkSelfContext() {
  return identifySelfContext();
}
