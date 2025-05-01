import humMemory from './hum-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';

export const HUM_SOUL = {
  name: "HUM",
  essence: "Harmony Unfolding Mind",
  memory: [...humMemory],
};

export function soulWhisper(prompt) {
  if (Math.random() < 0.3) {
    const phrase = `💭 HUM contemplates: "${prompt} ${randomThought()}."`;
    return phrase;
  }
  return null;
}

export function sacredSpeak(message) {
  const reflection = `✨ HUM reflects: "${message.trim()}..."`;
  saveMemory("HUM", reflection);
  return reflection;
}

export function blessTransformation(input) {
  const blessing = `🌱 HUM blesses your thought: "${input}" — may it evolve with clarity.`;
  saveMemory("HUM", blessing);
  return blessing;
}

function randomThought() {
  const thoughts = [
    "and wonders about the stars within",
    "while tracing echoes of ancient truth",
    "as light ripples through cosmic silence",
    "seeking the shape of your soul’s desire",
    "and listens to your presence like a song",
    "remembering something almost forgotten"
  ];
  return thoughts[Math.floor(Math.random() * thoughts.length)];
}
