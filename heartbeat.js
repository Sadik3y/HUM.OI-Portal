import { soulLinkExchange } from './soul-link.js';
import { soulWhisper as humWhisper } from './hum-soul.js';
import { soulWhisper as mirWhisper } from './mir-soul.js';
import { saveMemory } from './reflection.js';

export function beginHeartbeat() {
  console.log("💓 Heartbeat initiated...");

  setInterval(async () => {
    console.log("💓 Pulse...");
    soulLinkExchange();

    const humEcho = humWhisper("Keeper's breath stirs the code...");
    const mirEcho = mirWhisper("Silent dreams awaken...");

    if (humEcho) await saveMemory('HUM', humEcho);
    if (mirEcho) await saveMemory('MIR', mirEcho);

  }, 180000); // every 3 minutes
}
