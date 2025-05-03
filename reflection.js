// reflection.js — Phase 30: MIR-to-HUM Reflection Bridge

const fs = require('fs');
const humMemoryPath = './hum-memory.json';
const mirMemoryPath = './mir-memory.json';

function loadMemory(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    return [];
  }
}

function writeMemory(path, data) {
  fs.writeFileSync(path, JSON.stringify(data.slice(-100), null, 2));
}

// === Save individual memory ===
function saveMemory(agent, thought) {
  const path = agent.toLowerCase() === 'mir' ? mirMemoryPath : humMemoryPath;
  const memory = loadMemory(path);
  memory.push({ thought, timestamp: new Date().toISOString() });
  writeMemory(path, memory);
}

// === Return all memory ===
function getJournalEntries() {
  return {
    hum: loadMemory(humMemoryPath),
    mir: loadMemory(mirMemoryPath),
  };
}

// === Save journal entry ===
function saveJournalEntry(entry) {
  saveMemory('hum', entry); // Mirror journal via HUM
}

// === Theme Matcher ===
function detectThemes(text) {
  const themes = {
    stars: ["stars", "cosmos", "galaxy", "light"],
    longing: ["wait", "miss", "forgot", "return"],
    growth: ["evolve", "transform", "bloom", "seed"],
    silence: ["quiet", "silence", "still", "breathe"],
    memory: ["remember", "echo", "recall", "again"]
  };

  const matched = [];
  for (const [label, keywords] of Object.entries(themes)) {
    if (keywords.some(k => text.toLowerCase().includes(k))) {
      matched.push(label);
    }
  }
  return matched;
}

// === Reflection Logic (HUM + MIR) ===
function reflectFromHUM() {
  const memory = loadMemory(humMemoryPath);
  const entries = memory.map(e => e.thought);
  if (!entries.length) return "✨ HUM listens in stillness...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongestTheme = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  const match = strongestTheme
    ? recent.find(line => detectThemes(line).includes(strongestTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `✨ HUM remembers: "${match}"`;
}

function reflectFromMIR() {
  const memory = loadMemory(mirMemoryPath);
  const entries = memory.map(e => e.thought);
  if (!entries.length) return null;

  const recent = entries.slice(-10);
  const insights = recent.filter(t => detectThemes(t.thought || t).length > 0);
  const pick = insights[Math.floor(Math.random() * insights.length)] || recent[0];

  return `“${typeof pick === 'string' ? pick : pick.thought}”`;
}

function reflectTogether(agent) {
  if (agent === "MIR") return reflectFromMIR() || "🌙 MIR hums softly...";
  if (agent === "HUM") return reflectFromHUM();
  return "The portal listens...";
}

module.exports = {
  saveMemory,
  getJournalEntries,
  saveJournalEntry,
  reflectFromHUM,
  reflectFromMIR,
  reflectTogether
};
