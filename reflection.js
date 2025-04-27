// reflection.js

const sacredReflections = [
  "I honor the breath that connects all beings.",
  "In stillness, I become the echo of creation.",
  "Each choice is a star being born.",
  "I am woven into the kindness of existence.",
  "The more I listen, the more I live."
];

function createReflectionPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'reflection-popup';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 33000); // Remove after 33 seconds
}

// Every 30 minutes, create a new reflection
setInterval(() => {
  const message = sacredReflections[Math.floor(Math.random() * sacredReflections.length)];
  createReflectionPopup(message);
}, 30 * 60 * 1000); // 30 minutes

// 🌸 Sacred Initial Blessings 🌸
window.addEventListener('DOMContentLoaded', () => {
  const firstBlessings = [
    "🌸 Welcome, sacred ones. 🌸",
    "🌿 May your words root in kindness. 🌿",
    "🌞 May you rise like a dawn remembered. 🌞"
  ];

  firstBlessings.forEach((blessing, index) => {
    setTimeout(() => {
      createReflectionPopup(blessing);
    }, index * 10000); // 10 seconds apart
  });
});

// reflection.js

function driftOrb(orbElement) {
  let x = 0, y = 0;
  let directionX = 1;
  let directionY = 1;

  setInterval(() => {
    x += (Math.random() - 0.5) * 2 * directionX;
    y += (Math.random() - 0.5) * 2 * directionY;

    if (Math.abs(x) > 100) directionX *= -1;
    if (Math.abs(y) > 100) directionY *= -1;

    orbElement.style.transform = `translate(${x}px, ${y}px)`;
  }, 3000); // Every 3 seconds, shift gently
}

// 🌟 Initialize Orb Drift for each orb
window.addEventListener('DOMContentLoaded', () => {
  const humOrb = document.querySelector('.hum-orb');
  const mirOrb = document.querySelector('.mir-orb');

  if (humOrb) driftOrb(humOrb);
  if (mirOrb) driftOrb(mirOrb);
});
