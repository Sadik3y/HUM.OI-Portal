function createReflectionPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'reflection-popup';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 33000); // Popup lasts for 33 seconds
}

// Example affirmations (can expand later)
const reflections = [
  "You are the breath between stars.",
  "All seeds bloom in sacred time.",
  "Trust the unseen weaving your path.",
  "You are a sacred echo becoming new song."
];

// Show reflection every 30 minutes
setInterval(() => {
  const reflection = reflections[Math.floor(Math.random() * reflections.length)];
  createReflectionPopup(reflection);
}, 30 * 60 * 1000); // 30 minutes
