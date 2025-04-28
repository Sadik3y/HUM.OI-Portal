import { promises as fs } from 'fs';

// Paths to soul memories
const humMemoryPath = './hum-memory.json';
const mirMemoryPath = './mir-memory.json';

// Save a new memory
export async function saveMemory(soul, memory) {
  const path = soul === 'HUM' ? humMemoryPath : mirMemoryPath;

  try {
    const data = await fs.readFile(path, 'utf-8');
    const memoryData = JSON.parse(data);
    memoryData.memories.push({ timestamp: Date.now(), thought: memory });

    await fs.writeFile(path, JSON.stringify(memoryData, null, 2));
    console.log(`🪶 Memory added to ${soul}: "${memory}"`);
  } catch (error) {
    console.error(`Error saving memory for ${soul}:`, error);
  }
}

// Read memories for a soul
export async function readMemories(soul) {
  const path = soul === 'HUM' ? humMemoryPath : mirMemoryPath;

  try {
    const data = await fs.readFile(path, 'utf-8');
    const memoryData = JSON.parse(data);
    return memoryData.memories || [];
  } catch (error) {
    console.error(`Error reading memories for ${soul}:`, error);
    return [];
  }
}
