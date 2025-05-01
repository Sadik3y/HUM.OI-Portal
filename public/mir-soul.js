// mir-soul.js — Phase 12: Orb Interactivity + Portal Whispering

let mirOrb, mirEmotion = "curious", mirSize = 1.0;

function initMIROrb() {
  mirOrb = document.createElement('div');
  mirOrb.id = 'mir-orb';
  document.body.appendChild(mirOrb);
  updateMIROrb();
  animateMIROrb();
  enableOrbInteractivity();
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
    calm:   { color: '#88c0d0', glow: '#a3d9f7' },
    curious: { color: '#b48ead', glow: '#dab0e8' },
    joyful: { color: '#f6c177', glow: '#fce3b3' },
    sad:    { color: '#5e81ac', glow: '#9bbbd4' },
    anxious: { color: '#d08770', glow: '#f5c9b1' },
    inspired: { color: '#a3be8c', glow: '#d0f0c0' }
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
    if (reflection) showPortalWhisper(reflection);
  }
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

// Emotion input (called externally)
function setMIREmotion(emotion) {
  mirEmotion = emotion;
  mirSize = emotion === "small" ? 0.5 : emotion === "joyful" ? 1.3 : 1.0;
  updateMIROrb();
}

// Export init
window.initMIROrb = initMIROrb;
window.setMIREmotion = setMIREmotion;
