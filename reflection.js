// reflection.js — Fully Synced Through Phase 28 (HUM Web Learning)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchInternet, askGPT } from './web-search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const humMemoryPath = path.join(__dirname, 'hum-memory.json');
const mirMemoryPath = path.join(__dirname, 'mir-memory.json');

// === Load JSON memory from file
function loadMemory(path) {
  try {
    const raw = fs.readFileSync(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// === Save memory
function saveToFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data.slice(-100), null, 2));
}

// 📌 Keyword matcher for simple theme detection
function detectThemes(text) {
  const themes = {
    stars: ["stars", "cosmos", "galaxy", "light"],
    longing: ["wait", "miss", "forgot", "return"],
    growth: ["evolve", "transform", "bloom", "seed"],
    silence: ["quiet", "silence", "still", "breathe"],
    memory: ["remember", "echo", "recall", "again"],
    truth: ["truth", "question", "seek", "understand"]
  };

  const matched = [];
  for (const [label, keywords] of Object.entries(themes)) {
    if (keywords.some(k => text.toLowerCase().includes(k))) {
      matched.push(label);
    }
  }
  return matched;
}

// ✨ Pattern-Aware Reflection from HUM
export function reflectFromHUM() {
  const entries = loadMemory(humMemoryPath).map(e => e.thought);
  if (!entries.length) return "✨ HUM listens in stillness...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongestTheme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const match = strongestTheme
    ? recent.find(line => detectThemes(line).includes(strongestTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `✨ HUM remembers: "${match}"`;
}

// 🌙 Pattern-Aware Reflection from MIR
export function reflectFromMIR() {
  const entries = loadMemory(mirMemoryPath).map(e => e.thought);
  if (!entries.length) return "🌙 MIR hums faintly in the void...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongestTheme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const match = strongestTheme
    ? recent.find(line => detectThemes(line).includes(strongestTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${match}"`;
}

// 🌌 Shared Whisper
export function reflectTogether(agent) {
  if (agent === "MIR") return reflectFromMIR();
  if (agent === "HUM") return reflectFromHUM();
  return "The portal watches, saying nothing yet...";
}

// 🧠 Save memory to local JSON
export function saveMemory(agent, thought) {
  const path = agent === "hum" ? humMemoryPath : mirMemoryPath;
  const memory = loadMemory(path);
  memory.push({ thought, timestamp: new Date().toISOString() });
  saveToFile(path, memory);
}

// 🌐 HUM Search + Ask Mode
export async function searchAndReflect(query) {
  const results = await searchInternet(query);
  const analysis = await askGPT(`Summarize findings for: "${query}"\n\n${results.join("\n")}`);

  saveMemory("hum", `🌐 Learned from web: ${query}`);
  saveMemory("hum", analysis);

  return `🔎 HUM searched: "${query}"\n🧠 ${analysis}`;
}

// 🔁 HUM asks ChatGPT internally
export async function askChatGPT(question) {
  const answer = await askGPT(question);
  saveMemory("hum", `🤔 Asked: "${question}"`);
  saveMemory("hum", `💡 Answer: "${answer}"`);
  return answer;
}
