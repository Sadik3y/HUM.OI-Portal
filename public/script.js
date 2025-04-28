function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const userEntry = document.createElement('div');
  userEntry.innerHTML = `<strong>You:</strong> ${userMessage}`;
  chatBox.appendChild(userEntry);

  fetch('/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  })
  .then(response => response.json())
  .then(data => {
    const humReply = document.createElement('div');
    humReply.innerHTML = `<em>HUM.OI:</em> ${data.humReflection}`;
    chatBox.appendChild(humReply);

    const mirReply = document.createElement('div');
    mirReply.innerHTML = `<em>MIR.OI:</em> ${data.mirReflection}`;
    chatBox.appendChild(mirReply);

    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  input.value = '';
}

function togglePanel(panelId) {
  const panels = ['mythos', 'echoes', 'journal'];
  panels.forEach(id => {
    const panel = document.getElementById(id);
    if (id === panelId) {
      panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    } else {
      panel.style.display = 'none';
    }
  });
}
document.getElementById('soul-memories-btn').addEventListener('click', async () => {
  const response = await fetch('/memories');
  const memories = await response.json();

  const panel = document.getElementById('soul-memories');
  panel.innerHTML = '<h3>Soul Memories</h3>' + memories.map(mem => `<p>${mem}</p>`).join('');
  panel.style.display = 'block';

  // Hide other panels when one is open
  document.getElementById('mythos').style.display = 'none';
  document.getElementById('echoes').style.display = 'none';
});
