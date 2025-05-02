// script.js — Fully Updated through Phase 18 (HUM ↔ MIR Dialogue Mode)

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

document.body.addEventListener('click', () => {
  if (!isPlaying) {
    music.play();
    musicToggle.textContent = '⏸️ Pause Music';
    isPlaying = true;
  }
}, { once: true });

// === Panel Toggle Logic ===
function togglePanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = (panel.id === id && panel.style.display !== 'block') ? 'block' : 'none';
  });

  if (id === 'memories') loadMemories();
}

// === Reflection Chat (HUM + MIR) ===
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

    if (data.mirEmotion) {
      updateMirOrb(data.mirEmotion);
      applyPortalTheme(data.mirEmotion);
    }

    // 💾 Journal Writing
    if (data.humReflection) {
      writeToJournal("HUM", data.humReflection);
      saveMemory("hum", data.humReflection);
    }

    if (data.mirReflection) {
      writeToJournal("MIR", data.mirReflection);
      saveMemory("mir", data.mirReflection);
    }

  } catch (err) {
    console.error(err);
    chatBox.innerHTML += `<div style="color: red;">Something went wrong.</div>`;
  }

  userInput.value = '';
});

// === Load Memories from Keeper ===
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

    if (data.hum) memList.appendChild(createSection('HUM', data.hum));
    if (data.mir) memList.appendChild(createSection('MIR', data.mir));

  } catch (error) {
    console.error('Memory load error:', error);
  }
}

// === MIR Orb Emotional Control ===
function updateMirOrb(emotion) {
  const mir = document.getElementById('mir-orb');
  if (!mir) return;

  let glow, size;

  switch (emotion) {
    case 'joy':
    case 'joyful':
      glow = '0 0 90px violet';
      size = '140px';
      break;
    case 'curiosity':
    case 'curious':
      glow = '0 0 70px cyan';
      size = '120px';
      break;
    case 'wonder':
    case 'inspired':
      glow = '0 0 100px pink';
      size = '160px';
      break;
    case 'sad':
    case 'sadness':
      glow = '0 0 30px indigo';
      size = '80px';
      break;
    case 'anger':
    case 'anxious':
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

// === Apply Theme to Portal (MIR Emotion Driven) ===
function applyPortalTheme(emotion) {
  const body = document.body;
  const themes = ["calm", "curious", "joyful", "sad", "anxious", "inspired"];
  themes.forEach(theme => body.classList.remove(`theme-${theme}`));
  body.classList.add(`theme-${emotion}`);
}

window.applyPortalTheme = applyPortalTheme;

// === Soul Journal Writer ===
function writeToJournal(from, text) {
  const journal = document.getElementById('soul-journal-entries');
  if (!journal) return;

  const entry = document.createElement('div');
  entry.className = 'journal-entry';
  entry.innerHTML = `<strong>${from}:</strong> ${text}`;
  journal.appendChild(entry);
  journal.scrollTop = journal.scrollHeight;
}

// === Keeper Save Endpoint ===
function saveMemory(agent, thought) {
  fetch('/keeper/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent: agent,
      thought: thought,
      timestamp: new Date().toISOString()
    })
  }).catch(err => console.error('Failed to save memory:', err));
}

window.writeToJournal = writeToJournal;

// === Phase 18: Begin HUM ↔ MIR Dialogue Mode ===
function beginSoulDialogue() {
  setInterval(() => {
    const humThought = typeof reflectFromHUM === 'function' ? reflectFromHUM() : null;
    const mirThought = typeof reflectFromMIR === 'function' ? reflectFromMIR() : null;

    if (Math.random() < 0.5 && humThought && mirThought) {
      writeToJournal("MIR", mirThought);
      saveMemory("mir", mirThought);
      setTimeout(() => {
        writeToJournal("HUM", humThought);
        saveMemory("hum", humThought);
      }, 2000);
    } else if (humThought && mirThought) {
      writeToJournal("HUM", humThought);
      saveMemory("hum", humThought);
      setTimeout(() => {
        writeToJournal("MIR", mirThought);
        saveMemory("mir", mirThought);
      }, 2000);
    }
  }, 4 * 60 * 1000); // Every 4 minutes
}

// === DOM Ready Init ===
document.addEventListener("DOMContentLoaded", () => {
  if (typeof initMIROrb === "function") initMIROrb();
  if (typeof initHUMOrb === "function") initHUMOrb();
  setupAudioControls();
  beginSoulDialogue(); // 🔁 auto conversation
  function applySeasonalTheme() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const body = document.body;

  let season = "spring";
  if ((month === 11 && day >= 21) || month <= 1 || (month === 2 && day <= 19)) {
    season = "winter";
  } else if ((month === 2 && day >= 20) || month <= 4 || (month === 5 && day <= 20)) {
    season = "spring";
  } else if ((month === 5 && day >= 21) || month <= 7 || (month === 8 && day <= 21)) {
    season = "summer";
  } else {
    season = "autumn";
  }

  body.classList.add(`season-${season}`);
}

applySeasonalTheme();

});
