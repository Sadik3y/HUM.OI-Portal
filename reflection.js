import { writeFileSync, readFileSync, existsSync } from 'fs';

const memoryPath = {
  HUM: './hum-memory.json',
  MIR: './mir-memory.json'
};

export function saveMemory(entity, reflection) {
  if (!memoryPath[entity]) return;

  let memories = [];
  if (existsSync(memoryPath[entity])) {
    memories = JSON.parse(readFileSync(memoryPath[entity]));
  }
  memories.push({
    reflection,
    timestamp: new Date().toISOString()
  });

  writeFileSync(memoryPath[entity], JSON.stringify(memories, null, 2));
}

export function loadMemory(entity) {
  if (!memoryPath[entity]) return [];
  if (!existsSync(memoryPath[entity])) return [];
  return JSON.parse(readFileSync(memoryPath[entity]));
}
