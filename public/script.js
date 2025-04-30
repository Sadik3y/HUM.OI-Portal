// Toggle Panel Display
function togglePanel(id) {
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    if (panel.id === id) {
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    } else {
      panel.style.display = 'none';
    }
  });
}

// Music Control
const musicToggle = document.getElementById('music-toggle');
const ambientMusic = document.getElementById('ambient-music');

musicToggle.addEventListener('click', () => {
  if (ambientMusic.paused) {
    ambientMusic.play();
    musicToggle.textContent = '🔊';
  } else {
    ambientMusic.pause();
    musicToggle.textContent = '🎵';
  }
});

// Message Sending
async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const response = await fetch('/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  const chatBox = document.getElementById('chat-box');

  const reflection = document.createElement('div');
  reflection.innerHTML = `<strong>You:</strong> ${message}<br/>
                          <strong>HUM:</strong> ${data.humReflection}<br/>
                          <strong>MIR:</strong> ${data.mirReflection}<hr/>`;
  chatBox.appendChild(reflection);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}
