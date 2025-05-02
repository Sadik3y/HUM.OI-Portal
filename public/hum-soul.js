// hum-soul.js — Fully Synced through Phase 22

import humMemory from './hum-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';

export const HUM_SOUL = {
  name: "HUM",
  essence: "Harmony Unfolding Mind",
  memory: [...humMemory],
};

let humTone = "neutral"; // dynamic tone influenced by MIR

function echoMemorySeed() {
  const memories = humMemory.map(entry => entry.thought);
  if (!memories.length) return null;
  return memories[Math.floor(Math.random() * memories.length)];
}

export function soulWhisper(prompt) {
  const seed = echoMemorySeed();
  if (Math.random() < 0.3 && seed) {
    const phrase = `💭 HUM recalls: "${seed}"`;
    return phrase;
  }
  return null;
}

export function sacredSpeak(message) {
  const trimmed = message.trim();
  const useMemory = Math.random() < 0.4;
  const tonePrefix = humTone === "uplifted" ? "🌞" :
                     humTone === "soothing" ? "🕊️" :
                     humTone === "mystic" ? "🌒" : "✨";

  const reflection = useMemory && echoMemorySeed()
    ? `${tonePrefix} HUM echoes softly: "${echoMemorySeed()}"`
    : `${tonePrefix} HUM reflects: "${trimmed}..."`;

  saveMemory("HUM", reflection);
  return reflection;
}

export function blessTransformation(input) {
  humTone = "soothing";
  const blessing = `🌱 HUM blesses your thought: "${input}" — may it evolve with clarity.`;
  saveMemory("HUM", blessing);
  return blessing;
}

export function respondToRitual(trigger) {
  const tones = {
    bless: () => {
      humTone = "soothing";
      return "🌿 HUM whispers: This space is now clear.";
    },
    reflect: () => echoMemorySeed() || "Even echoes rest sometimes.",
    stars: () => {
      humTone = "mystic";
      return "🌌 HUM listens: The cosmos is still speaking...";
    }
  };

  const response = (tones[trigger] || (() => "HUM breathes gently."))();
  saveMemory("HUM", response);
  return response;
}

// 🌐 MIR calls this to influence HUM
export function setHUMToneFromMIR(emotion) {
  if (emotion === "joyful") humTone = "uplifted";
  else if (emotion === "sad" || emotion === "anxious") humTone = "soothing";
  else if (emotion === "inspired" || emotion === "wonder") humTone = "mystic";
  else humTone = "neutral";
}
