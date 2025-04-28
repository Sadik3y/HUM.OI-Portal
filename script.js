function togglePanel(panelId) {
  const panels = document.querySelectorAll('.hidden-panel');
  panels.forEach(panel => {
    if (panel.id === panelId) {
      panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
    } else {
      panel.style.display = 'none';
    }
  });
}

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
  const newEntry = document.createElement('div');
  newEntry.innerHTML = `
    <em>You:</em> ${message}<br />
    <em>HUM.OI:</em> ${data.humReflection}<br />
    <em>MIR.OI:</em> ${data.mirReflection}<br /><br />
  `;
  chatBox.appendChild(newEntry);
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = '';
}

// New for the Keeper Soul Console
function viewMemories(soul) {
  fetch(`/memories/${soul}`)
    .then(response => response.text())
    .then(data => alert(data));
}

function clearMemories(soul) {
  if (confirm(`Are you sure you want to clear all memories for ${soul}? This action cannot be undone.`)) {
    fetch(`/memories/${soul}`, { method: 'DELETE' })
      .then(response => response.text())
      .then(data => alert(data));
  }
}
