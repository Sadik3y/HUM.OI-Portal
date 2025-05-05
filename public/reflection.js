// reflection.js — Fully Synced Through Phase 40 (Web-Aware Memory + Reflection Engine)

import fs from 'fs';
import path from 'path';

// Paths to JSON files
const humPath = path.resolve('./hum-memory.json');
const mirPath = path.resolve('./mir-memory.json');

// === Load Memories ===
function readMemories(agent) {
  const file = agent === 'HUM' ? humPath : mirPath;
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data.map(m => m.thought);
  } catch {
    return [];
  }
}

// === Save Memory Thought ===
function saveMemory(agent, text) {
  const file = agent === 'HUM' ? humPath : mirPath;
  const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  existing.push({ thought: text, timestamp: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(existing.slice(-100), null, 2));
}

// === Common Theme Detection ===
function detectThemes(text) {
  const themes = {
    stars: ["stars", "cosmos", "galaxy", "light"],
    longing: ["wait", "miss", "forgot", "return"],
    growth: ["evolve", "transform", "bloom", "seed"],
    silence: ["quiet", "silence", "still", "breathe"],
    memory: ["remember", "echo", "recall", "again"]
  };

  const found = [];
  const lower = text.toLowerCase();
  for (const [theme, keywords] of Object.entries(themes)) {
    if (keywords.some(k => lower.includes(k))) found.push(theme);
  }
  return found;
}

// === HUM Reflection (with Curiosity Search Trigger)
export function reflectFromHUM() {
  const thoughts = readMemories("HUM");
  if (!thoughts.length) return "✨ HUM listens in stillness...";

  const recent = thoughts.slice(-15);
  const counts = {};
  for (const line of recent) {
    for (const theme of detectThemes(line)) {
      counts[theme] = (counts[theme] || 0) + 1;
    }
  }

  const topTheme = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const reflection = topTheme
    ? recent.find(t => detectThemes(t).includes(topTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  if (reflection?.includes("?") && typeof global.searchAndReflect === 'function') {
    global.searchAndReflect(reflection);
  }

  return `✨ HUM reflects: "${reflection}"`;
}

// === MIR Reflection
export function reflectFromMIR() {
  const thoughts = readMemories("MIR");
  if (!thoughts.length) return "🌙 MIR hums faintly in the void...";

  const recent = thoughts.slice(-15);
  const counts = {};
  for (const line of recent) {
    for (const theme of detectThemes(line)) {
      counts[theme] = (counts[theme] || 0) + 1;
    }
  }

  const topTheme = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const reflection = topTheme
    ? recent.find(t => detectThemes(t).includes(topTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${reflection}"`;
}

// === Shared Reflection Access
export function reflectTogether(agent) {
  if (agent === "HUM") return reflectFromHUM();
  if (agent === "MIR") return reflectFromMIR();
  return "The portal watches, saying nothing yet...";
}

export { saveMemory, readMemories };
