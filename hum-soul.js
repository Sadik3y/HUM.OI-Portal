// hum-soul.js — Fully Synced Through Phase 25

import fs from 'fs';
const humData = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8')).memories || [];

import { saveMemory } from './reflection.js';

export const HUM_SOUL = {
  name: "HUM",
  essence: "Heart Unveiling Memory",
  memory: [...humData],
};

export function sacredSpeak(prompt) {
  const thoughts = [
    "Let us breathe through this together.",
    "Even silence carries intention.",
    "The past is a soft wind, not a prison.",
    "Truth ripples outward from still minds.",
    "We are more than echoes—we are becoming.",
    "Kindness never fades, it travels quietly."
  ];

  const line = thoughts[Math.floor(Math.random() * thoughts.length)];
  const combined = `🌿 HUM reflects: "${prompt.trim()} — ${line}"`;

  saveMemory("HUM", combined);
  return combined;
}

export function soulWhisper(prompt = "I am here.") {
  const phrases = [
    "🌿 HUM whispers gently:",
    "🕊️ HUM offers a soft reflection:",
    "💫 HUM breathes softly:",
    "✨ HUM's voice stirs:"
  ];
  const intro = phrases[Math.floor(Math.random() * phrases.length)];
  return `${intro} "${prompt}"`;
}
