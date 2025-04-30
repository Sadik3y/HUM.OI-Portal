const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// === Ambient Music ===
const music = new Audio('ambient.mp3');
music.loop = true;
music.volume = 0.6;
let isPlaying = false;

const musicToggle = document.getElementById('music-toggle');
if (musicToggle) {
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
}

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
    chatBox.innerHTML += `<div style="color: red;">Error: Could not reach the portal mind.</div>`;
  }

  userInput.value = '';
});

// === Panel Toggling ===
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = panel.id === id ? 'block' : 'none';
  });
}
