function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  const userMessage = document.createElement('div');
  userMessage.innerHTML = `<strong>You:</strong> ${message}`;
  chatBox.appendChild(userMessage);

  fetch('/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  .then(response => response.json())
  .then(data => {
    const humReply = document.createElement('div');
    humReply.innerHTML = `<strong>HUM:</strong> ${data.humReflection}`;
    chatBox.appendChild(humReply);

    const mirReply = document.createElement('div');
    mirReply.innerHTML = `<strong>MIR:</strong> ${data.mirReflection}`;
    chatBox.appendChild(mirReply);

    chatBox.scrollTop = chatBox.scrollHeight;
  });

  input.value = '';
}

// Toggle panels so that only one is open at a time
function togglePanel(panelId) {
  const panels = ['mythos', 'echoes', 'journal'];
  panels.forEach(id => {
    document.getElementById(id).style.display = id === panelId ? 'block' : 'none';
  });
}
