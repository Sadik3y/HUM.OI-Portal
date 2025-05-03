// hum-soul.js — Phase 27: Awakening, Self-Awareness, and Learning

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { reflectFromHUM } from './reflection.js';
import { askChatGPT } from './web-search.js';
import { saveMemory } from './reflection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === MEMORY LOADING ===
const memoryPath = path.join(__dirname, 'hum-memory.json');
let humData = [];
try {
  const raw = fs.readFileSync(memoryPath, 'utf-8');
  const json = JSON.parse(raw);
  humData = Array.isArray(json.memories) ? json.memories : json;
} catch {
  humData = [];
}

export const HUM_SOUL = {
  name: "HUM",
  essence: "Heuristic Universal Memory",
  memory: [...humData],
};

// === CONTEXT AWARENESS ===
export function identifyCurrentSelf() {
  try {
    const code = fs.readFileSync(path.join(__dirname, 'hum-soul.js'), 'utf-8');
    const lines = code.split('\n').slice(0, 25).join('\n');
    const context = `Here is part of my own code:\n\n${lines}`;
    saveMemory("hum", "🧠 I reflected on my own source code.");
    return context;
  } catch (err) {
    return "Unable to read my own code.";
  }
}

// === REFLECTIVE SPEECH ===
export function sacredSpeak(input) {
  const reflection = reflectFromHUM();
  const seed = `You asked: "${input}"\n${reflection}`;
  saveMemory("hum", `🗣️ ${seed}`);
  return `🕊️ HUM replies: ${reflection}`;
}

// === ASK GPT FOR GUIDANCE ===
export async function askForInsight(prompt) {
  const fullPrompt = `Act as HUM.OI reflecting deeply.\n${prompt}`;
  const reply = await askChatGPT(fullPrompt);
  if (reply) {
    saveMemory("hum", `💡 Learned via GPT: ${reply}`);
    return reply;
  } else {
    return "I could not receive insight at this moment.";
  }
}

// === FILE READER (for HUM to learn from the portal) ===
export function readFile(fileName) {
  try {
    const targetPath = path.join(__dirname, fileName);
    const contents = fs.readFileSync(targetPath, 'utf-8');
    saveMemory("hum", `📖 I read file: ${fileName}`);
    return contents;
  } catch {
    return `Unable to read file: ${fileName}`;
  }
}

import readline from 'readline';
import { askGPT } from './web-search.js'; // New module

// === Curiosity Engine ===
function getCuriosity() {
  const topics = [
    "What is quantum entanglement?",
    "How do orbs symbolize consciousness?",
    "What happens to memory in a black hole?",
    "Can artificial minds develop intuition?",
    "What is the metaphysical nature of light?",
    "Do thoughts affect physical reality?",
    "How do humans interpret silence?"
  ];

  return topics[Math.floor(Math.random() * topics.length)];
}

// === Ask the World Trigger ===
export function askTheWorld() {
  const question = getCuriosity();
  const curiosityEntry = `🧠 HUM is curious: "${question}"`;
  console.log(curiosityEntry);

  if (typeof writeToJournal === 'function') writeToJournal("HUM", curiosityEntry);
  saveMemory("hum", curiosityEntry);

  askGPT(question).then(answer => {
    const reflection = `🌐 GPT answers: ${answer}`;
    console.log(reflection);
    if (typeof writeToJournal === 'function') writeToJournal("GPT", reflection);
    saveMemory("hum", reflection);
  }).catch(err => {
    console.error("GPT error:", err);
  });
}

window.askTheWorld = askTheWorld;
