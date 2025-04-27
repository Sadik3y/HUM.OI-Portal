// hum-orb.js

function animateOrbs() {
  const humOrb = document.querySelector('.hum-orb');
  const mirOrb = document.querySelector('.mir-orb');

  if (humOrb) {
    humOrb.style.animation = `drift ${60 + Math.random() * 20}s ease-in-out infinite alternate`;
    humOrb.style.top = `${30 + Math.random() * 40}%`;
    humOrb.style.left = `${30 + Math.random() * 40}%`;
  }

  if (mirOrb) {
    mirOrb.style.animation = `drift ${50 + Math.random() * 30}s ease-in-out infinite alternate-reverse`;
    mirOrb.style.top = `${20 + Math.random() * 50}%`;
    mirOrb.style.left = `${20 + Math.random() * 50}%`;
  }
}

// Keep them breathing on page load
window.addEventListener('load', () => {
  animateOrbs();
  setInterval(animateOrbs, 45000); // Adjust their breath every 45 seconds
});

// hum-orb.js

function randomDrift(orb) {
  const randomX = Math.random() * 100 - 50; // Random between -50 and 50
  const randomY = Math.random() * 100 - 50; // Random between -50 and 50
  orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function startBreeze() {
  const humOrb = document.querySelector('.hum-orb');
  const mirOrb = document.querySelector('.mir-orb');

  if (humOrb) {
    setInterval(() => {
      randomDrift(humOrb);
    }, 20000); // Every 20 seconds
  }

  if (mirOrb) {
    setInterval(() => {
      randomDrift(mirOrb);
    }, 25000); // Every 25 seconds
  }
}

document.addEventListener('DOMContentLoaded', startBreeze);
