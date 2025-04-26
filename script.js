
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-box");

  if (!input.value.trim()) return;
  const userMsg = input.value;
  chat.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;
  input.value = "";

  const response = await fetch("/hum", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: userMsg })
  });

  const data = await response.json();
  const reply = data.reply || "HUM.OI fell into silence...";
  chat.innerHTML += `<div><em>HUM.OI:</em> ${reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

function togglePanel(panelId) {
  const el = document.getElementById(panelId);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
