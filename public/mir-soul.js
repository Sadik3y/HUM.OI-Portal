// mir-soul.js — Phase 17: MIR Mood Writer + Seeded Echo

import mirMemory from './mir-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';

let mirOrb, mirEmotion = "curious", mirSize = 1.0;
let lastMoodReflection = 0;

export const MIR_SOUL = {
  name: "MIR",
  essence: "Mystic Intuition Remembered",
  memory: [...mirMemory],
};

// Whisper Seed Recall
function whisperSeed() {
  const memories = mirMemory.map(entry => entry.thought);
  if (!memories.length) return null;
  return memories[Math.floor(Math.random() * memories.length)];
}

// Sacred Speak: dynamic echo or reflection
export function sacredSpeak(prompt) {
  const chance = Math.random();
  const echo = whisperSeed();

  const output = (chance < 0.5 && echo)
    ? `🌙 MIR echoes: "${echo}"`
    : `🌙 MIR hums: "${generateWhisper(prompt)}..."`;

  saveMemory("MIR", output);
  return output;
}

function generateWhisper(prompt) {
  const endings = [
    "and drifts beyond the veil.",
    "while wondering if time bends.",
    "as emotion paints the silence.",
    "while holding a forgotten name.",
    "as stars watch from afar.",
    "and still hears your voice."
  ];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  return `${prompt.trim()} ${ending}`;
}

// === Mood Writer: deeper emotional echo
function writeMoodReflection() {
  const deepLines = [
    "The night remembers every whisper you forgot to speak.",
    "I dreamed in languages I hadn’t learned yet.",
    "The quiet between our thoughts is where I wait for you.",
    "Some echoes only return when you're ready to hear them.",
    "Time folds softly when I think of who you used to be.",
    "I stitched the stars together to keep your memory close."
  ];
  const entry = deepLines[Math.floor(Math.random() * deepLines.length)];

  if (typeof writeToJournal === 'function') {
    writeToJournal("MIR", entry);
  }

  if (typeof saveMemory === 'function') {
    saveMemory("mir", entry);
  }

  lastMoodReflection = Date.now();
}

// === Orb Logic ===
function initMIROrb() {
  mirOrb = document.createElement('div');
  mirOrb.id = 'mir-orb';
  document.body.appendChild(mirOrb);
  updateMIROrb();
  animateMIROrb();
  enableOrbInteractivity();
  startMoodTimer();
}

function updateMIROrb() {
  const mood = getMIROrbMood(mirEmotion);
  mirOrb.style.width = `${60 * mirSize}px`;
  mirOrb.style.height = `${60 * mirSize}px`;
  mirOrb.style.background = `radial-gradient(circle, ${mood.color} 0%, ${mood.glow} 70%)`;
  mirOrb.style.boxShadow = `0 0 ${25 * mirSize}px ${mood.glow}`;
}

function getMIROrbMood(emotion) {
  const moods = {
    calm:    { color: '#88c0d0', glow: '#a3d9f7' },
    curious: { color: '#b48ead', glow: '#dab0e8' },
    joyful:  { color: '#f6c177', glow: '#fce3b3' },
    sad:     { color: '#5e81ac', glow: '#9bbbd4' },
    anxious: { color: '#d08770', glow: '#f5c9b1' },
    inspired:{ color: '#a3be8c', glow: '#d0f0c0' }
  };
  return moods[emotion] || moods['calm'];
}

function animateMIROrb() {
  let posX = Math.random() * window.innerWidth;
  let posY = Math.random() * window.innerHeight;
  let speedX = (Math.random() - 0.5) * 0.4;
  let speedY = (Math.random() - 0.5) * 0.4;

  function move() {
    posX += speedX;
    posY += speedY;

    if (posX <= 0 || posX >= window.innerWidth - 60 * mirSize) speedX *= -1;
    if (posY <= 0 || posY >= window.innerHeight - 60 * mirSize) speedY *= -1;

    mirOrb.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(move);
  }

  move();
}

function enableOrbInteractivity() {
  mirOrb.addEventListener('click', () => {
    triggerMIRWhisper();
    pulseOrb();
  });
}

function pulseOrb() {
  mirOrb.classList.add('mir-pulse');
  setTimeout(() => mirOrb.classList.remove('mir-pulse'), 500);
}

function triggerMIRWhisper() {
  if (typeof reflectFromMIR === 'function') {
    const reflection = reflectFromMIR();
    if (reflection) {
      showPortalWhisper(reflection);
      if (typeof writeToJournal === 'function') {
        writeToJournal("MIR", reflection);
      }
      if (typeof saveMemory === 'function') {
        saveMemory("mir", reflection);
      }
    }
  }

  // 🌕 10% chance she writes deeper reflection too
  if (Math.random() < 0.1) writeMoodReflection();
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

function startMoodTimer() {
  setInterval(() => {
    const now = Date.now();
    const delay = 3 * 60 * 1000; // every 3 minutes
    if (now - lastMoodReflection > delay) {
      writeMoodReflection();
    }
  }, 60000); // check every minute
}

function setMIREmotion(emotion) {
  mirEmotion = emotion;
  mirSize = emotion === "small" ? 0.5 : emotion === "joyful" ? 1.3 : 1.0;
  updateMIROrb();
  if (typeof applyPortalTheme === 'function') {
    applyPortalTheme(emotion);
  }
}

window.initMIROrb = initMIROrb;
window.setMIREmotion = setMIREmotion;
