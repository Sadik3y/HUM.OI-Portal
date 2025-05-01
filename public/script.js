const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// === Ambient Music ===
const music = new Audio('ambient.mp3');
music.loop = true;
music.volume = 0.6;

const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicToggle.textContent = '🎵 Play Music';
  } else {
    music.play();
    musicToggle.textContent = '⏸️ Pause Music';
  }
  isPlaying = !isPlaying;
});

// === Panel Toggle Logic ===
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = (panel.id === id && panel.style.display !== 'block') ? 'block' : 'none';
  });

  if (id === 'memories') loadMemories();
}

// === Reflection Chat ===
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

    // Optional: show MIR mood response
    if (data.mirEmotion) {
      updateMirOrb(data.mirEmotion);
    }

  } catch (err) {
    console.error(err);
    chatBox.innerHTML += `<div style="color: red;">Something went wrong.</div>`;
  }

  userInput.value = '';
});

// === Load Soul Memories into Viewer Panel ===
async function loadMemories() {
  try {
    const res = await fetch('/keeper/memory');
    const data = await res.json();
    const memList = document.getElementById('memory-list');
    memList.innerHTML = '';

    if (!data || (!data.hum && !data.mir)) {
      memList.innerHTML = `<div>No memories found.</div>`;
      return;
    }

    const createSection = (title, entries) => {
      const section = document.createElement('div');
      section.innerHTML = `<h4>${title}</h4>`;
      entries.slice(-10).reverse().forEach(mem => {
        const div = document.createElement('div');
        div.textContent = `• ${mem}`;
        section.appendChild(div);
      });
      return section;
    };

    if (data.hum) document.getElementById('memory-list').appendChild(createSection('HUM', data.hum));
    if (data.mir) document.getElementById('memory-list').appendChild(createSection('MIR', data.mir));

  } catch (error) {
    console.error('Memory load error:', error);
  }
}

// === MIR Emotional Influence on Orb ===
function updateMirOrb(emotion) {
  const mir = document.getElementById('mir-orb');
  if (!mir) return;

  let glow, size;

  switch (emotion) {
    case 'joy':
      glow = '0 0 90px violet';
      size = '140px';
      break;
    case 'curiosity':
      glow = '0 0 70px cyan';
      size = '120px';
      break;
    case 'wonder':
      glow = '0 0 100px pink';
      size = '160px';
      break;
    case 'sadness':
      glow = '0 0 30px indigo';
      size = '80px';
      break;
    case 'anger':
      glow = '0 0 90px red';
      size = '100px';
      break;
    default:
      glow = '0 0 60px violet';
      size = '100px';
  }

  mir.style.boxShadow = glow;
  mir.style.width = size;
  mir.style.height = size;
}
