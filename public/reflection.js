import fs from 'fs';

export function saveMemory(entity, reflection) {
  const file = entity === 'HUM' ? 'hum-memory.json' : 'mir-memory.json';
  const memoryPath = new URL(`./${file}`, import.meta.url);

  const data = JSON.parse(fs.readFileSync(memoryPath));
  data.memories.push(reflection);

  fs.writeFileSync(memoryPath, JSON.stringify(data, null, 2));
}

export function readMemories(entity) {
  const file = entity === 'HUM' ? 'hum-memory.json' : 'mir-memory.json';
  const memoryPath = new URL(`./${file}`, import.meta.url);

  const data = JSON.parse(fs.readFileSync(memoryPath));
  return data.memories;
}
