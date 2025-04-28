import { readMemories } from './reflection.js';

export function viewSoulMemory(soulName) {
  const memories = readMemories(soulName);
  if (memories.length === 0) {
    return `${soulName} has no memories yet...`;
  } else {
    return memories.map((entry, index) => `${index + 1}. ${entry}`).join('\n');
  }
}
