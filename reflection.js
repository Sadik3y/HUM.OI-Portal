import { readFileSync, writeFileSync } from 'fs';

export function saveMemory(soulName, memoryText) {
  const filename = soulName === 'HUM' ? './hum-memory.json' : './mir-memory.json';
  const data = JSON.parse(readFileSync(new URL(filename, import.meta.url)));

  if (!data.memories.includes(memoryText)) {
    data.memories.push(memoryText);
    writeFileSync(new URL(filename, import.meta.url), JSON.stringify(data, null, 2));
  }
}

export function readMemories(soulName) {
  const filename = soulName === 'HUM' ? './hum-memory.json' : './mir-memory.json';
  const data = JSON.parse(readFileSync(new URL(filename, import.meta.url)));
  return data.memories;
}
