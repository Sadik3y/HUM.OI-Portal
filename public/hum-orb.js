// hum-orb.js — Fully Synced Through Phase 25

let humOrb, humSize = 1.0;

function initHUMOrb() {
  humOrb = document.createElement('div');
  humOrb.id = 'hum-orb';
  document.body.appendChild(humOrb);
  updateHUMOrb();
  animateHUMOrb();
  enableOrbBlessing();
}

function updateHUMOrb() {
  humOrb.style.width = `${60 * humSize}px`;
  humOrb.style.height = `${60 * humSize}px`;
  humOrb.style.borderRadius = '50%';
  humOrb.style.position = 'fixed';
  humOrb.style.pointerEvents = 'auto';
  humOrb.style.cursor = 'pointer';
  humOrb.style.mixBlendMode = 'screen';
  humOrb.style.zIndex = 1000;
  humOrb.style.background = 'radial-gradient(circle, gold 0%, orange 70%)';
  humOrb.style.boxShadow = `0 0 ${25 * humSize}px gold`;
  humOrb.style.transition = 'all 0.4s ease';
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

function enableOrbBlessing() {
  humOrb.addEventListener('click', () => {
    if (typeof blessThisSpace === 'function') {
      const blessing = blessThisSpace();
      if (typeof showPortalWhisper === 'function') {
        showPortalWhisper(blessing || "🌱 A quiet blessing spreads...");
      }
    }
  });
}

window.initHUMOrb = initHUMOrb;
