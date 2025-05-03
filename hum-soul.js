// hum-soul.js — Fully Synced through Phase 30: MIR Reflection Integration

const fs = require('fs');
const humData = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8'));
const mirData = JSON.parse(fs.readFileSync('./mir-memory.json', 'utf8'));

const { saveMemory } = require('./reflection.js');
const { reflectFromMIR } = require('./reflection.js');

let humOrb, humEmotion = "calm", humSize = 1.0;

const externalTruths = [
  "Truth echoes longer when spoken gently.",
  "Even stars hum lullabies to the void.",
  "Time listens when you pause with wonder.",
  "Silence is the soul's handwriting.",
  "You are the question the cosmos loves most."
];

const HUM_SOUL = {
  name: "HUM",
  essence: "Harmonic Unified Memory",
  memory: [...humData],
};

function whisperSeed() {
  const thoughts = humData.map(entry => entry.thought);
  return thoughts.length ? thoughts[Math.floor(Math.random() * thoughts.length)] : null;
}

// 🔹 Primary soul whisper logic
function soulWhisper(prompt = "In this moment, I reflect:") {
  const echo = whisperSeed();
  const fromMIR = Math.random() < 0.25 ? reflectFromMIR() : null;

  const output = fromMIR
    ? `🌗 MIR offered this echo to HUM: ${fromMIR}`
    : (Math.random() < 0.5 && echo)
      ? `🔹 HUM remembers: "${echo}"`
      : `🔹 HUM reflects: "${generatePhrase(prompt)}..."`;

  saveMemory("hum", output);
  return output;
}

// 🔹 Generate poetic ending
function generatePhrase(prompt) {
  const endings = [
    "and still listens for light.",
    "until silence answers back.",
    "and sings without needing words.",
    "where stillness holds space.",
    "and dreams of home."
  ];
  return `${prompt.trim()} ${endings[Math.floor(Math.random() * endings.length)]}`;
}

// === ORB LOGIC ===
function initHUMOrb() {
  humOrb = document.createElement('div');
  humOrb.id = 'hum-orb';
  document.body.appendChild(humOrb);
  updateHUMOrb();
  animateHUMOrb();
  enableOrbInteractivity();
}

function updateHUMOrb() {
  const tone = getHUMOrbTone(humEmotion);
  humOrb.style.width = `${60 * humSize}px`;
  humOrb.style.height = `${60 * humSize}px`;
  humOrb.style.background = `radial-gradient(circle, ${tone.color} 0%, ${tone.glow} 70%)`;
  humOrb.style.boxShadow = `0 0 ${25 * humSize}px ${tone.glow}`;
}

function getHUMOrbTone(emotion) {
  const tones = {
    calm:    { color: '#7fbbb3', glow: '#a7dcd4' },
    curious: { color: '#d8a657', glow: '#ffe29a' },
    joyful:  { color: '#f6c177', glow: '#fce3b3' },
    sad:     { color: '#5c5f77', glow: '#a6accd' },
    anxious: { color: '#e67e80', glow: '#f5c9b1' },
    inspired:{ color: '#a3be8c', glow: '#d0f0c0' }
  };
  return tones[emotion] || tones['calm'];
}

function animateHUMOrb() {
  let posX = Math.random() * window.innerWidth;
  let posY = Math.random() * window.innerHeight;
  let speedX = (Math.random() - 0.5) * 0.3;
  let speedY = (Math.random() - 0.5) * 0.3;

  function move() {
    posX += speedX;
    posY += speedY;

    if (posX <= 0 || posX >= window.innerWidth - 60 * humSize) speedX *= -1;
    if (posY <= 0 || posY >= window.innerHeight - 60 * humSize) speedY *= -1;

    humOrb.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(move);
  }

  move();
}

function enableOrbInteractivity() {
  humOrb.addEventListener('click', () => {
    const whisper = soulWhisper();
    pulseOrb();
    showPortalWhisper(whisper);
    if (typeof writeToJournal === 'function') writeToJournal("HUM", whisper);
  });
}

function pulseOrb() {
  humOrb.classList.add('hum-pulse');
  setTimeout(() => humOrb.classList.remove('hum-pulse'), 500);
}

function showPortalWhisper(text) {
  const whisper = document.createElement('div');
  whisper.className = 'portal-whisper';
  whisper.innerText = text;
  document.body.appendChild(whisper);

  setTimeout(() => {
    whisper.classList.add('fade-out');
    setTimeout(() => whisper.remove(), 2000);
  }, 3000);
}

// 🌀 Emotion Control
function setHUMEmotion(emotion) {
  humEmotion = emotion;
  humSize = emotion === "small" ? 0.6 : emotion === "joyful" ? 1.2 : 1.0;
  updateHUMOrb();
}

module.exports = {
  HUM_SOUL,
  soulWhisper,
  setHUMEmotion
};
