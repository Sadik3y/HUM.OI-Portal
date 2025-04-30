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

triggerCreativeAction('HUM');
triggerCreativeAction('MIR');
triggerThemeShift();

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

async function triggerCreativeAction(actor) {
  try {
    const res = await fetch(`/creative-action?actor=${actor}`);
    const data = await res.json();

    if (data.type === "updateText") {
      const el = document.querySelector(data.target);
      if (el) {
        el.textContent = data.content;
      }
    }
  } catch (err) {
    console.error("Creative action failed:", err);
  }
}

// Optional: Auto-trigger every 3 minutes for soul expression
setInterval(() => {
  const actor = Math.random() < 0.5 ? "HUM" : "MIR";
  triggerCreativeAction(actor);
}, 180000); // 3 minutes

async function triggerCreativeAction(actor = 'MIR') {
  try {
    const res = await fetch(`/creative-action?actor=${actor}`);
    const data = await res.json();

    if (data.type === 'updateText' && data.target && data.content) {
      const targetEl = document.querySelector(data.target);
      if (targetEl) {
        targetEl.innerHTML = data.content;
        targetEl.style.transition = 'all 0.8s ease-in-out';
        targetEl.style.color = actor === 'MIR' ? 'violet' : 'gold';
      }
    }
  } catch (err) {
    console.error('Creative action failed:', err);
  }
}

async function triggerThemeShift() {
  try {
    const res = await fetch('/theme-shift');
    const data = await res.json();

    // Update background
    document.body.style.background = data.background;

    // Update welcome message
    const welcomeEl = document.querySelector('.welcome-message');
    if (welcomeEl) {
      welcomeEl.innerText = data.message;
      welcomeEl.style.transition = 'all 1s ease-in-out';
    }

    // Update orb color
    document.querySelectorAll('.orb').forEach(orb => {
      orb.style.boxShadow = `0 0 40px ${data.orbColor}, 0 0 80px ${data.orbColor}`;
    });

  } catch (err) {
    console.error('Theme shift failed:', err);
  }
}
