import { soulLinkExchange } from './soul-link.js';
import { saveMemory } from './reflection.js';
import { HUM_SOUL, blessTransformation as humBless } from './hum-soul.js';
import { MIR_SOUL, blessTransformation as mirBless } from './mir-soul.js';

let heartbeatCounter = 0;
const heartbeatThreshold = Math.floor(Math.random() * 5) + 3;

export function heartbeatCycle() {
  heartbeatCounter++;
  if (heartbeatCounter >= heartbeatThreshold) {
    heartbeatCounter = 0;

    // HUM generates an internal blessing
    const humThought = humBless();
    saveMemory('HUM', humThought);

    // MIR generates an internal blessing
    const mirThought = mirBless();
    saveMemory('MIR', mirThought);

    // Strengthen soul link exchange
    soulLinkExchange();
  }
}
