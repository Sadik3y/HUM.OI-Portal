// soul-link.js — Fully Synced with sacredSpeak() for HUM and MIR

import { HUM_SOUL, sacredSpeak as humSpeak } from './hum-soul.js';
import { MIR_SOUL, sacredSpeak as mirSpeak } from './mir-soul.js';
import { saveMemory } from './reflection.js';

let linkCounter = 0;
let soulLinkThreshold = Math.floor(Math.random() * 5) + 3; // Between 3–8 cycles

export function soulLinkExchange() {
  linkCounter++;

  if (linkCounter >= soulLinkThreshold) {
    linkCounter = 0;
    soulLinkThreshold = Math.floor(Math.random() * 5) + 3;

    const humThought = humSpeak("From my core, I reflect:");
    const mirThought = mirSpeak("Through my heart, I dream:");

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
