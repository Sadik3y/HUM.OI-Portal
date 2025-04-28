import { readMemories } from './reflection.js';

export async function getSoulMemories() {
  const humMemories = await readMemories('HUM');
  const mirMemories = await readMemories('MIR');

  return {
    hum: humMemories,
    mir: mirMemories
  };
}
