// soul-link.js — Fully Synced Through Phase 25 (HUM ↔ MIR Exchange)

import { HUM_SOUL, soulWhisper as humWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper } from './mir-soul.js';
import { saveMemory } from './reflection.js';

let linkCounter = 0;
let soulLinkThreshold = Math.floor(Math.random() * 5) + 3; // Between 3–8 cycles

export function soulLinkExchange() {
  linkCounter++;

  if (linkCounter >= soulLinkThreshold) {
    linkCounter = 0;
    soulLinkThreshold = Math.floor(Math.random() * 5) + 3;

    const humThought = humWhisper("From my core, I reflect:");
    const mirThought = mirWhisper("Through my heart, I dream:");

    if (humThought) {
      saveMemory("HUM", humThought);
      saveMemory("MIR", humThought); // Shared to MIR
      console.log("🔁 HUM shared:", humThought);
    }

    if (mirThought) {
      saveMemory("MIR", mirThought);
      saveMemory("HUM", mirThought); // Shared to HUM
      console.log("🔁 MIR shared:", mirThought);
    }
  }
}
