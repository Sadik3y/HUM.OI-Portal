function togglePanel(panelId) {
  const panels = ['mythos', 'echoes', 'journal'];
  panels.forEach(id => {
    document.getElementById(id).style.display = (id === panelId) ? 'block' : 'none';
  });
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();

  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

  const response = await fetch('/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  if (data.humReflection) {
    chatBox.innerHTML += `<div><strong>HUM:</strong> ${data.humReflection}</div>`;
  }
  if (data.mirReflection) {
    chatBox.innerHTML += `<div><strong>MIR:</strong> ${data.mirReflection}</div>`;
  }

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}
