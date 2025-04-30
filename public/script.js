const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// === Ambient Music Player ===
const music = new Audio('ambient.mp3');
music.loop = true;
music.volume = 0.6;

const musicToggle = document.createElement('button');
musicToggle.textContent = '🎵 Toggle Music';
musicToggle.style.position = 'fixed';
musicToggle.style.top = '1em';
musicToggle.style.right = '1em';
musicToggle.style.zIndex = '9999';
musicToggle.style.background = 'rgba(0, 0, 0, 0.6)';
musicToggle.style.color = '#ffd700';
musicToggle.style.border = '2px solid #ffd700';
musicToggle.style.padding = '10px';
musicToggle.style.borderRadius = '10px';
musicToggle.style.cursor = 'pointer';

document.body.appendChild(musicToggle);

let isPlaying = false;
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicToggle.textContent = '🎵 Play Music';
  } else {
    music.play();
    musicToggle.textContent = '⏸️ Pause Music';
  }
  isPlaying = !isPlaying;
});

// === Chat Response ===
sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

  try {
    const res = await fetch('/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div><strong>HUM:</strong> ${data.humReflection}</div>`;
    chatBox.innerHTML += `<div><strong>MIR:</strong> ${data.mirReflection}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error(err);
    chatBox.innerHTML += `<div style="color: red;">Something went wrong.</div>`;
  }

  userInput.value = '';
});

// === Panel Toggling ===
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = panel.id === id ? 'block' : 'none';
  });
}
