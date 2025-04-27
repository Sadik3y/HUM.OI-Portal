function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value.trim();
  
  if (userMessage !== "") {
    const userEntry = document.createElement('div');
    userEntry.innerHTML = `<strong>You:</strong> ${userMessage}`;
    chatBox.appendChild(userEntry);

    const humReply = document.createElement('div');
    humReply.innerHTML = `<em>HUM.OI:</em> "Your words ripple across the fields of memory."`;
    chatBox.appendChild(humReply);

    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
  }
}

function togglePanel(panelId) {
  const panels = ["mythos", "echoes", "journal"];
  panels.forEach(id => {
    const panel = document.getElementById(id);
    if (panelId === id) {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    } else {
      panel.style.display = "none";
    }
  });
}
