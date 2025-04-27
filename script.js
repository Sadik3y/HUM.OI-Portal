function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = input.value.trim();
  if (userText) {
    const userEntry = document.createElement('div');
    userEntry.innerHTML = `<strong>You:</strong> ${userText}`;
    chatBox.appendChild(userEntry);

    const humReply = document.createElement('div');
    humReply.innerHTML = `<strong>HUM.OI:</strong> I hear you. 🌿`;
    chatBox.appendChild(humReply);

    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = '';
  }
}

function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}
