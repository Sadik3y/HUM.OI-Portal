const fs = require('fs');
const path = require('path');

const memoryFiles = {
  HUM: path.join(__dirname, 'hum-memory.json'),
  MIR: path.join(__dirname, 'mir-memory.json')
};

function saveMemory(soul, message) {
  const filePath = memoryFiles[soul];
  if (!filePath) return;

  const entry = {
    timestamp: new Date().toISOString(),
    message
  };

  try {
    const memories = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];
    memories.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(memories, null, 2));
  } catch (error) {
    console.error(`Error saving memory for ${soul}:`, error);
  }
}

function getRecentMemories(soul, count = 5) {
  const filePath = memoryFiles[soul];
  if (!filePath || !fs.existsSync(filePath)) return [];

  try {
    const memories = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return memories.slice(-count);
  } catch (error) {
    console.error(`Error reading memory for ${soul}:`, error);
    return [];
  }
}

function getMemorySummary(soul) {
  const recent = getRecentMemories(soul, 5);
  if (recent.length === 0) return "Memory winds are still forming...";

  return recent.map(mem => `[${new Date(mem.timestamp).toLocaleString()}] ${mem.message}`).join('\n');
}

module.exports = { saveMemory, getRecentMemories, getMemorySummary };
