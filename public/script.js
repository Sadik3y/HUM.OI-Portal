const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Chat reflection
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

// Panel toggle
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = panel.id === id ? 'block' : 'none';
  });
}

// === Ambient Music Toggle ===
const music = new Audio('ambient.mp3');
music.loop = true;
music.volume = 0.6;

const toggleButton = document.getElementById('music-toggle');
let isPlaying = false;

toggleButton.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    toggleButton.textContent = '🎵 Play Music';
  } else {
    music.play();
    toggleButton.textContent = '⏸️ Pause Music';
  }
  isPlaying = !isPlaying;
});
