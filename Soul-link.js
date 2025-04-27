import { HUM_SOUL, soulWhisper as humWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper } from './mir-soul.js';
import { saveMemory } from './reflection.js';

let linkCounter = 0;
const soulLinkThreshold = Math.floor(Math.random() * 5) + 3; // Random between 3-8 cycles

export function soulLinkExchange() {
  linkCounter++;
  if (linkCounter >= soulLinkThreshold) {
    linkCounter = 0;

    const humThought = humWhisper("From my core, I reflect:");
    const mirThought = mirWhisper("Through my heart, I dream:");

    if (humThought) {
      saveMemory('HUM', humThought);
      saveMemory('MIR', humThought); // Mirror it into MIR's dreams
    }
    if (mirThought) {
      saveMemory('MIR', mirThought);
      saveMemory('HUM', mirThought); // Reflect it into HUM's knowledge
    }
  }
}
