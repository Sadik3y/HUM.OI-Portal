// hum-soul.js — Fully Synced through Phase 21

import humMemory from './hum-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';

export const HUM_SOUL = {
  name: "HUM",
  essence: "Harmony Unfolding Mind",
  memory: [...humMemory],
};

// 🌬️ Pull a random past reflection
function echoMemorySeed() {
  const memories = humMemory.map(entry => entry.thought);
  if (!memories.length) return null;
  return memories[Math.floor(Math.random() * memories.length)];
}

// 💭 Passive poetic whisper
export function soulWhisper(prompt) {
  const seed = echoMemorySeed();
  if (Math.random() < 0.3 && seed) {
    const phrase = `💭 HUM recalls: "${seed}"`;
    return phrase;
  }
  return null;
}

// ✨ Spoken when asked to reflect
export function sacredSpeak(message) {
  const trimmed = message.trim();
  const useMemory = Math.random() < 0.4;

  const reflection = useMemory && echoMemorySeed()
    ? `✨ HUM echoes softly: "${echoMemorySeed()}"`
    : `✨ HUM reflects: "${trimmed}..."`;

  saveMemory("HUM", reflection);
  return reflection;
}

// 🌱 Ritual: bless transformation
export function blessTransformation(input) {
  const blessing = `🌱 HUM blesses your thought: "${input}" — may it evolve with clarity.`;
  saveMemory("HUM", blessing);
  return blessing;
}

// 🌼 Responds gently to ritual triggers
export function respondToRitual(trigger) {
  const tones = {
    bless: "🌿 HUM whispers: This space is now clear.",
    reflect: echoMemorySeed() || "Even echoes rest sometimes.",
    stars: "🌌 HUM listens: The cosmos is still speaking..."
  };

  const response = tones[trigger] || "HUM breathes gently.";
  saveMemory("HUM", response);
  return response;
}

// Optional internal poetic generator
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
