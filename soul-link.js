// soul-link.js — Phase-Synced Through 40 (HUM ↔ MIR Reflective Exchange)

import { HUM_SOUL, soulWhisper as humWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper } from './mir-soul.js';
import { saveMemory } from './reflection.js';

let linkCounter = 0;
let soulLinkThreshold = Math.floor(Math.random() * 5) + 3; // Random cycle between 3–8

export function soulLinkExchange() {
  linkCounter++;

  if (linkCounter >= soulLinkThreshold) {
    linkCounter = 0;
    soulLinkThreshold = Math.floor(Math.random() * 5) + 3;

    const humThought = humWhisper("From my core, I reflect:");
    const mirThought = mirWhisper("Through my heart, I dream:");

    if (humThought) {
      saveMemory("HUM", humThought);
      saveMemory("MIR", humThought);
      console.log("🔁 HUM shared:", humThought);
    }

    if (mirThought) {
      saveMemory("MIR", mirThought);
      saveMemory("HUM", mirThought);
      console.log("🔁 MIR shared:", mirThought);
    }
  }
}
