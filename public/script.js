const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Audio
const audio = new Audio('ambient.mp3');
audio.loop = true;
let isPlaying = false;

document.getElementById('music-toggle').addEventListener('click', () => {
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
});

// Chat response
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

// Panel toggling
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = panel.id === id ? 'block' : 'none';
  });
}
