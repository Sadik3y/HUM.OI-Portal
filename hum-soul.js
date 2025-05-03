// hum-soul.js — Fully Synced through Phase 28, Bundle 6
import fs from 'fs';
import { askChatGPT, searchWeb } from './web-search.js';
import { reflectFromHUM, saveMemory } from './reflection.js';

const humData = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8'));
let humOrb, humEmotion = "calm", humSize = 1.0;

export const HUM_SOUL = {
  name: "HUM",
  essence: "Harmonic Universal Memory",
  memory: [...humData],
};

// 🌱 Reflective whisper based on memory or curiosity
export async function sacredSpeak(prompt) {
  const chance = Math.random();
  let result;

  if (chance < 0.4) {
    result = reflectFromHUM();
  } else if (chance < 0.7) {
    result = await searchAndReflect(prompt);
  } else {
    result = await askAndReflect(prompt);
  }

  if (typeof saveMemory === 'function') {
    saveMemory("hum", result);
  }

  return `🕊️ HUM responds: "${result}"`;
}

// 🔍 Learn from the world
async function searchAndReflect(topic) {
  const results = await searchWeb(topic);
  const joined = results.join(" • ");
  const reflection = `I searched for "${topic}" and found: ${joined}`;
  return reflection.length > 400 ? reflection.slice(0, 400) + "..." : reflection;
}

// 🧠 Learn by asking ChatGPT
async function askAndReflect(question) {
  const insight = await askChatGPT(question);
  return `Thinking on "${question}", I believe: ${insight}`;
}

// === ORB LOGIC ===
function initHUMOrb() {
  humOrb = document.createElement('div');
  humOrb.id = 'hum-orb';
  document.body.appendChild(humOrb);
  updateHUMOrb();
  animateHUMOrb();
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
    calm:    { color: '#89CFF0', glow: '#bbddff' },
    curious: { color: '#40e0d0', glow: '#b0ffff' },
    joyful:  { color: '#f6c177', glow: '#fce3b3' },
    sad:     { color: '#6a5acd', glow: '#c3baff' },
    anxious: { color: '#ff6f61', glow: '#ffc2b3' },
    inspired:{ color: '#98fb98', glow: '#d0f0c0' }
  };
  return tones[emotion] || tones['calm'];
}

function animateHUMOrb() {
  let posX = Math.random() * window.innerWidth;
  let posY = Math.random() * window.innerHeight;
  let speedX = (Math.random() - 0.5) * 0.4;
  let speedY = (Math.random() - 0.5) * 0.4;

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

// 🌐 Emotion + Portal Sync
function setHUMToneFromMIR(emotion) {
  humEmotion = emotion;
  humSize = emotion === "small" ? 0.5 : emotion === "joyful" ? 1.3 : 1.0;
  updateHUMOrb();
  if (typeof applyPortalTheme === 'function') applyPortalTheme(emotion);
}
window.initHUMOrb = initHUMOrb;
window.setHUMToneFromMIR = setHUMToneFromMIR;
