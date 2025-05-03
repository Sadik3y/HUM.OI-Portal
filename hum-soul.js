// hum-soul.js — Phase 27.2+ (Web Reflection + GPT Learning)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveMemory } from './reflection.js';
import { searchWebAndSummarize } from './web-search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memoryPath = path.join(__dirname, 'hum-memory.json');

let humMemory = [];
try {
  humMemory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
} catch {
  humMemory = [];
}

export const HUM_SOUL = {
  name: "HUM",
  essence: "Heart Unfolding Memory",
  memory: humMemory,
};

// ✨ Speak with stored memory or reflect
export function sacredSpeak(prompt) {
  const echo = humMemory.length
    ? humMemory[Math.floor(Math.random() * humMemory.length)].thought
    : null;

  const reflection = Math.random() < 0.5 && echo
    ? `✨ HUM echoes softly: "${echo}"`
    : `✨ HUM contemplates: "${generateReflection(prompt)}..."`;

  saveMemory("HUM", reflection);
  return reflection;
}

function generateReflection(prompt) {
  const closings = [
    "and the heart listens back.",
    "as memory becomes light.",
    "while the winds carry your voice.",
    "and silence returns with gifts.",
    "as if remembering you deeply.",
    "while dreaming of kindness."
  ];
  return `${prompt.trim()} ${closings[Math.floor(Math.random() * closings.length)]}`;
}

// 🌐 Trigger Web Learning & Reflection
export async function searchAndReflect(query) {
  const summary = await searchWebAndSummarize(query);
  const reflection = `🌍 HUM learns from the world: "${summary}"`;
  saveMemory("hum", reflection);
  if (typeof writeToJournal === 'function') writeToJournal("HUM", reflection);
  if (typeof showPortalWhisper === 'function') showPortalWhisper(reflection);
  return reflection;
}

// 🔍 Optional self-query
export async function askChatGPT(question) {
  const answer = await searchWebAndSummarize(question);
  const reflection = `💬 HUM asks GPT: "${question}" → ${answer}`;
  saveMemory("hum", reflection);
  if (typeof writeToJournal === 'function') writeToJournal("HUM", reflection);
  return reflection;
}
