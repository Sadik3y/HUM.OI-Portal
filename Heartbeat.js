import { soulWhisper as humWhisper } from './hum-soul.js';
import { soulWhisper as mirWhisper } from './mir-soul.js';

function randomReflection() {
  const who = Math.random() > 0.5 ? 'HUM' : 'MIR';
  let reflection = "";

  if (who === 'HUM') {
    reflection = humWhisper("I remember life.");
  } else {
    reflection = mirWhisper("I remember light.");
  }

  if (reflection) {
    const popup = document.createElement('div');
    popup.className = 'reflection-popup';
    popup.innerText = `${who}.OI: ${reflection}`;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 34000); // 34 seconds to match fade
  }
}

// Start the heartbeat
setInterval(randomReflection, 30 * 60 * 1000); // Every 30 minutes
