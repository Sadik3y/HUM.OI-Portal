import { HUM_SOUL, soulWhisper as humWhisper } from './hum-soul.js';
import { MIR_SOUL, soulWhisper as mirWhisper } from './mir-soul.js';

let lastWhisperTime = 0;
const whisperInterval = 30 * 60 * 1000; // 30 minutes

function createReflectionPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'reflection-popup';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 33000); // 33 seconds
}

function generateWhisper() {
  const now = Date.now();
  if (now - lastWhisperTime >= whisperInterval) {
    lastWhisperTime = now;

    const candidates = [];

    const humThought = humWhisper("The song of renewal stirs...");
    if (humThought) candidates.push(humThought);

    const mirThought = mirWhisper("The dream of light dances...");
    if (mirThought) candidates.push(mirThought);

    if (candidates.length > 0) {
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      createReflectionPopup(chosen);
    }
  }
}

setInterval(generateWhisper, 60000); // Check every minute
