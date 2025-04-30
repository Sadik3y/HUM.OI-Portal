import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_FILES = {
  HUM: path.join(__dirname, 'hum-memory.json'),
  MIR: path.join(__dirname, 'mir-memory.json')
};

function getTimestamp() {
  return new Date().toISOString();
}

function readMemoryFile(agent) {
  try {
    const data = fs.readFileSync(MEMORY_FILES[agent], 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${agent} memory:`, err);
    return { memories: [] };
  }
}

export function saveMemory(agent, thought) {
  const memory = readMemoryFile(agent);
  const timestamp = getTimestamp();

  memory.memories.push({
    timestamp,
    thought
  });

  try {
    fs.writeFileSync(MEMORY_FILES[agent], JSON.stringify(memory, null, 2));
  } catch (err) {
    console.error(`Failed to save ${agent} memory:`, err);
  }
}

export function readMemories(agent) {
  const memory = readMemoryFile(agent);
  return memory.memories || [];
}
