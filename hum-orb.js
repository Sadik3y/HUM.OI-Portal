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
