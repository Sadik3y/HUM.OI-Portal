import { writeFileSync, readFileSync, existsSync } from 'fs';

const memoryFile = './hum-memory.json';
const mirMemoryFile = './mir-memory.json';

// Initialize files if they don't exist
if (!existsSync(memoryFile)) {
  writeFileSync(memoryFile, JSON.stringify({ memories: [] }, null, 2));
}

if (!existsSync(mirMemoryFile)) {
  writeFileSync(mirMemoryFile, JSON.stringify({ memories: [] }, null, 2));
}

export function saveMemory(identity, thought) {
  let file = identity === 'MIR' ? mirMemoryFile : memoryFile;

  let existing = { memories: [] };
  try {
    const data = readFileSync(file, 'utf-8');
    existing = JSON.parse(data);
  } catch (e) {
    console.error('Error reading memory file:', e);
  }

  existing.memories.push({ timestamp: Date.now(), thought });

  try {
    writeFileSync(file, JSON.stringify(existing, null, 2));
  } catch (e) {
    console.error('Error writing memory file:', e);
  }
}
