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
