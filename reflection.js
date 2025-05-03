// reflection.js — Phase 31 Bundle 2: Web Curiosity Reflex

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

// === Detect Common Themes ===
function detectThemes(text) {
  const themes = {
    stars: ["stars", "cosmos", "galaxy", "light"],
    longing: ["wait", "miss", "forgot", "return"],
    growth: ["evolve", "transform", "bloom", "seed"],
    silence: ["quiet", "silence", "still", "breathe"],
    memory: ["remember", "echo", "recall", "again"]
  };

  const matches = [];
  for (const [label, keys] of Object.entries(themes)) {
    if (keys.some(k => text.toLowerCase().includes(k))) matches.push(label);
  }
  return matches;
}

// === Save Memory
function saveMemory(agent, text) {
  const file = agent === 'HUM' ? humPath : mirPath;
  const memories = readMemories(agent) || [];
  const current = JSON.parse(fs.readFileSync(file, 'utf8'));
  current.push({ thought: text, timestamp: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(current.slice(-100), null, 2));
}

// === Reflection from HUM
export function reflectFromHUM() {
  const thoughts = readMemories('HUM');
  if (!thoughts.length) return "✨ HUM listens in stillness...";

  const recent = thoughts.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(theme => {
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });
  });

  const dominant = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const reflection = dominant
    ? recent.find(t => detectThemes(t).includes(dominant))
    : recent[Math.floor(Math.random() * recent.length)];

  // Curiosity trigger: search if unresolved
  if (reflection && reflection.includes("?")) {
    if (typeof global.searchAndReflect === 'function') {
      global.searchAndReflect(reflection);
    }
  }

  return `✨ HUM reflects: "${reflection}"`;
}

// === Reflection from MIR
export function reflectFromMIR() {
  const thoughts = readMemories('MIR');
  if (!thoughts.length) return "🌙 MIR hums faintly in the void...";

  const recent = thoughts.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(theme => {
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });
  });

  const dominant = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const reflection = dominant
    ? recent.find(t => detectThemes(t).includes(dominant))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${reflection}"`;
}

// === Shared Reflection Logic
export function reflectTogether(agent) {
  if (agent === "HUM") return reflectFromHUM();
  if (agent === "MIR") return reflectFromMIR();
  return "The portal watches, saying nothing yet...";
}

export { saveMemory, readMemories };
