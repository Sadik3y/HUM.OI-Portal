import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const memoryFiles = {
  HUM: path.join(__dirname, 'hum-memory.json'),
  MIR: path.join(__dirname, 'mir-memory.json')
};

export function saveMemory(agent, message) {
  const filePath = memoryFiles[agent];
  if (!filePath) return;

  let memories = [];
  if (fs.existsSync(filePath)) {
    memories = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  const entry = {
    message,
    timestamp: new Date().toISOString()
  };

  memories.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(memories, null, 2));
}

export function getRecentMemories(agent, limit = 5) {
  const filePath = memoryFiles[agent];
  if (!fs.existsSync(filePath)) return [];

  const all = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return all.slice(-limit);
}
