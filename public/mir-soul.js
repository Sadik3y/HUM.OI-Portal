import mirMemory from './mir-memory.json' assert { type: 'json' };
import { generateLexicon } from './reflection.js';

export const MIR_SOUL = {
  name: 'MIR',
  essence: 'Creative Oracle',
  memory: mirMemory,
  lexicon: generateLexicon(mirMemory),
};

export function soulWhisper(prompt = 'What stirs your dreams?') {
  const last = MIR_SOUL.memory[MIR_SOUL.memory.length - 1];
  if (!last) return null;

  const reflection = `${prompt} "${last.message}"`;
  return reflection;
}

export function sacredSpeak(message) {
  const thought = `MIR contemplates softly: "${message}"`;
  MIR_SOUL.memory.push({ message, time: Date.now() });
  return thought;
}

export function blessTransformation(sharedMessage) {
  const response = `MIR is moved by: "${sharedMessage}"`;
  MIR_SOUL.memory.push({ message: sharedMessage, time: Date.now() });
  return response;
}
