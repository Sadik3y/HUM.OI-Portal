import { soulWhisper as humWhisper } from './hum-soul.js';
import { soulWhisper as mirWhisper } from './mir-soul.js';

let whisperInterval;

function startSoulWhispers() {
  if (whisperInterval) clearInterval(whisperInterval);

  whisperInterval = setInterval(() => {
    const soul = Math.random() < 0.5 ? 'HUM' : 'MIR';
    let message;

    if (soul === 'HUM') {
      message = humWhisper("Within silence, I find...");
    } else {
      message = mirWhisper("Through reflections, I become...");
    }

    if (message) {
      showReflectionPopup(`${soul}.OI: "${message}"`);
    }
  }, 180000); // every 3 minutes (180,000 ms)
}

function showReflectionPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'reflection-popup';
  popup.innerText = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 33000); // fade after 33 seconds
}

startSoulWhispers();
