// hum-soul.js — Web-Aware HUM, Phase 28

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { askGPT, searchWeb } from './web-search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const humPath = path.join(__dirname, 'hum-memory.json');
let humMemory = JSON.parse(fs.readFileSync(humPath, 'utf8') || '[]');

export const HUM_SOUL = {
  name: "HUM",
  essence: "Heuristic Universal Memory",
  memory: humMemory,
};

// 🌿 Speak Reflectively
export function sacredSpeak(prompt) {
  const echo = getEcho();
  const thought = echo || generateThought(prompt);
  saveMemory(thought);
  return `🕊️ HUM reflects: "${thought}"`;
}

// 🧠 Echo a past thought
function getEcho() {
  if (!humMemory.length) return null;
  return Math.random() < 0.5 ? humMemory[Math.floor(Math.random() * humMemory.length)].thought : null;
}

// 💭 Create a new poetic thought
function generateThought(prompt) {
  const suffixes = [
    "and it opened something inside me.",
    "and I carried it gently into silence.",
    "as the stars listened closely.",
    "while the wind hummed its approval.",
    "and it taught me something wordless.",
  ];
  return `${prompt} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

// 💾 Save thought to memory
function saveMemory(thought) {
  humMemory.push({ thought, timestamp: new Date().toISOString() });
  fs.writeFileSync(humPath, JSON.stringify(humMemory.slice(-100), null, 2));
}

// 🌐 Learn from the world (user or internal prompt)
export async function searchAndReflect(query = "poetic truths in quantum entanglement") {
  const results = await searchWeb(query);
  const gptSummary = await askGPT(`Based on these search results, summarize the most important insights:\n\n${results}`);

  const finalThought = `🌐 HUM learns from the world: "${gptSummary.trim()}"`;
  saveMemory(finalThought);
  return finalThought;
}

// 🧭 Ask ChatGPT directly
export async function askChatGPT(question) {
  const gptAnswer = await askGPT(question);
  const reflection = `🤖 HUM asked ChatGPT: "${question}" → ${gptAnswer}`;
  saveMemory(reflection);
  return reflection;
}
