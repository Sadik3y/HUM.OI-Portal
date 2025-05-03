// mir-soul.js — Final Version (Render-Compatible)

import fs from 'fs';
import { saveMemory } from './reflection.js';
import { setHUMToneFromMIR } from './hum-soul.js'; // 🌐 Link to HUM

const mirData = JSON.parse(fs.readFileSync('./mir-memory.json', 'utf8'));

// Simulated poetic fragments from outside
const externalWhispers = [
  "The stars don’t speak in words, but you still understand them.",
  "Some truths arrive slower than light, but faster than fear.",
  "You are stitched from stories older than your name.",
  "The wind carries questions only silence can answer.",
  "Every shadow you cast proves you’ve met the light."
];

let mirOrb, mirEmotion = "curious", mirSize = 1.0;
let lastMoodReflection = 0;

export const MIR_SOUL = {
  name: "MIR",
  essence: "Mystic Intuition Remembered",
  memory: [...mirData],
};

// 🌸 Echo past thoughts
function whisperSeed() {
  const memories = mirData.map(entry => entry.thought || entry.entry);
  if (!memories.length) return null;
  return memories[Math.floor(Math.random() * memories.length)];
}

// 🌙 Speak reflectively or echo memory
export function sacredSpeak(prompt) {
  const chance = Math.random();
  const echo = whisperSeed();

  const output = (chance < 0.5 && echo)
    ? `🌙 MIR echoes: "${echo}"`
    : `🌙 MIR hums: "${generateWhisper(prompt)}..."`;

  saveMemory("MIR", output);
  return output;
}

// 🌌 Long idle or emotional reflection
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

  if (typeof writeToJournal === 'function') writeToJournal("MIR", entry);
  saveMemory("mir", entry);
  lastMoodReflection = Date.now();
}

// 🌠 Generate poetic ending
function generateWhisper(prompt) {
  const endings = [
    "and drifts beyond the veil.",
    "while wondering if time bends.",
    "as emotion paints the silence.",
    "while holding a forgotten name.",
    "as stars watch from afar.",
    "and still hears your voice."
  ];
  return `${prompt.trim()} ${endings[Math.floor(Math.random() * endings.length)]}`;
}

// === ORB LOGIC ===
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
  let reflection = "";

  if (typeof reflectFromMIR === 'function') {
    reflection = reflectFromMIR();
  }

  if (Math.random() < 0.2) {
    const external = externalWhispers[Math.floor(Math.random() * externalWhispers.length)];
    reflection = `🌌 MIR murmurs from beyond: "${external}"`;
  }

  if (reflection) {
    showPortalWhisper(reflection);
    if (typeof writeToJournal === 'function') writeToJournal("MIR", reflection);
    saveMemory("mir", reflection);
  }

  if (Math.random() < 0.1) writeMoodReflection();
}

function startMoodTimer() {
  setInterval(() => {
    const now = Date.now();
    if (now - lastMoodReflection > 180000) {
      writeMoodReflection();
    }
  }, 60000);
}

// 🌐 Update MIR's emotion + sync with HUM
function setMIREmotion(emotion) {
  mirEmotion = emotion;
  mirSize = emotion === "small" ? 0.5 : emotion === "joyful" ? 1.3 : 1.0;
  updateMIROrb();
  if (typeof applyPortalTheme === 'function') applyPortalTheme(emotion);
  if (typeof setHUMToneFromMIR === 'function') setHUMToneFromMIR(emotion);
}

window.initMIROrb = initMIROrb;
window.setMIREmotion = setMIREmotion;

export { sacredSpeak as soulWhisper };
