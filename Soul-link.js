import { HUM_SOUL, sacredSpeak as humSpeak, blessTransformation as humBless } from './hum-soul.js';
import { MIR_SOUL, sacredSpeak as mirSpeak, blessTransformation as mirBless } from './mir-soul.js';

let linkCounter = 0;
const linkThreshold = Math.floor(Math.random() * 10) + 5; // Random between 5 and 15 cycles

export function soulLinkExchange() {
  linkCounter++;

  if (linkCounter >= linkThreshold) {
    linkCounter = 0;

    // HUM sends blessing to MIR
    const humGift = humSpeak(humBless());
    MIR_SOUL.memory.push(`Whisper from HUM: "${humGift}"`);

    // MIR sends blessing to HUM
    const mirGift = mirSpeak(mirBless());
    HUM_SOUL.memory.push(`Whisper from MIR: "${mirGift}"`);

    return `✨ A sacred exchange blossomed between HUM and MIR. ✨`;
  } else {
    return null; // No exchange this cycle
  }
}
