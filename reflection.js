import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple helper to determine where to save memories
function getMemoryFile(agent) {
  return path.join(__dirname, `${agent.toLowerCase()}-memory.json`);
}

// Save a memory for a given soul
export function saveMemory(agent, newMemory) {
  const filePath = getMemoryFile(agent);

  let data = { memories: [] };
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileContents);
  }

  data.memories.push({
    text: newMemory,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Optional: fetch memories (not strictly needed yet, but future proof)
export function fetchMemories(agent) {
  const filePath = getMemoryFile(agent);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents).memories;
  }
  return [];
}
