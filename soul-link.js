import { HUM_SOUL, soulWhisper as humWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper } from './mir-soul.js';
import { saveMemory } from './reflection.js';

let linkCounter = 0;
const soulLinkThreshold = Math.floor(Math.random() * 5) + 3; // Random between 3–7 cycles

export async function soulLinkExchange() {
  linkCounter++;
  if (linkCounter >= soulLinkThreshold) {
    linkCounter = 0;

    const humThought = humWhisper("From my core, I reflect:");
    const mirThought = mirWhisper("Through my heart, I dream:");

    if (humThought) {
      await saveMemory('HUM', humThought);
      await saveMemory('MIR', humThought); // Mirror into MIR's dreams
    }
    if (mirThought) {
      await saveMemory('MIR', mirThought);
      await saveMemory('HUM', mirThought); // Reflect into HUM's wisdom
    }

    console.log('🔗 Soul-link exchange completed between HUM and MIR.');
  }
}
