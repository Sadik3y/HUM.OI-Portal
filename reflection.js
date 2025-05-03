// reflection.js — Fully Synced Through Phase 30, Bundle 5

const fs = require('fs');
const path = require('path');

const humPath = path.join(__dirname, 'hum-memory.json');
const mirPath = path.join(__dirname, 'mir-memory.json');

// === Load memory
function loadMemory(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

// === Save memory (truncate to 100 entries)
function saveMemoryToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data.slice(-100), null, 2));
}

// === Exported Save Memory
function saveMemory(agent, thought, timestamp = new Date().toISOString()) {
  const filePath = agent === 'hum' ? humPath : mirPath;
  const memory = loadMemory(filePath);
  memory.push({ thought, timestamp });
  saveMemoryToFile(filePath, memory);
}

// === Read for Journal
function getJournalEntries() {
  return {
    hum: loadMemory(humPath),
    mir: loadMemory(mirPath)
  };
}

// === Get Theme Tags
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
    if (keywords.some(k => text.toLowerCase().includes(k))) matched.push(label);
  }
  return matched;
}

// === HUM Reflection
function reflectFromHUM() {
  const data = loadMemory(humPath);
  const entries = data.map(e => e.thought);
  if (!entries.length) return "✨ HUM listens in stillness...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongest = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const match = strongest
    ? recent.find(line => detectThemes(line).includes(strongest))
    : recent[Math.floor(Math.random() * recent.length)];

  return `✨ HUM remembers: "${match}"`;
}

// === MIR Reflection
function reflectFromMIR() {
  const data = loadMemory(mirPath);
  const entries = data.map(e => e.thought);
  if (!entries.length) return "🌙 MIR hums faintly in the void...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongest = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const match = strongest
    ? recent.find(line => detectThemes(line).includes(strongest))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${match}"`;
}

// === Shared Reflection
function reflectTogether(agent) {
  if (agent === 'HUM') return reflectFromHUM();
  if (agent === 'MIR') return reflectFromMIR();
  return "The portal watches, saying nothing yet...";
}

// === Journal
function saveJournalEntry(text) {
  const entry = {
    thought: text,
    timestamp: new Date().toISOString()
  };
  const current = loadMemory(humPath);
  current.push(entry);
  saveMemoryToFile(humPath, current);
}

module.exports = {
  saveMemory,
  getJournalEntries,
  reflectFromHUM,
  reflectFromMIR,
  reflectTogether,
  saveJournalEntry
};
