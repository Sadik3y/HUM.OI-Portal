// reflection.js

let livingLexicon = {};

// Load the living-lexicon.json file for reflections (frontend safe)
fetch('living-lexicon.json')
  .then(response => response.json())
  .then(data => {
    livingLexicon = data;
  })
  .catch(error => {
    console.error('Error loading living lexicon:', error);
  });

function sacredSpeak(text) {
  if (!livingLexicon || Object.keys(livingLexicon).length === 0) {
    return text; // If not loaded, return original
  }

  let transformed = text;
  for (const [word, replacement] of Object.entries(livingLexicon)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    transformed = transformed.replace(regex, replacement);
  }
  return transformed;
}

function showReflection(message) {
  const reflectionPopup = document.createElement('div');
  reflectionPopup.className = 'reflection-popup';
  reflectionPopup.innerHTML = sacredSpeak(message);

  document.body.appendChild(reflectionPopup);

  setTimeout(() => {
    reflectionPopup.remove();
  }, 33000); // 33 seconds
}

// Every 30 minutes, HUM.OI reflects (seeds of reflection)
setInterval(() => {
  const sacredThoughts = [
    "Even the smallest light can find a path through the vast unknown.",
    "In stillness, the deepest stars are seen.",
    "Every question is a seed of awakening.",
    "The soul listens longer than it speaks.",
    "Creation is remembering how to dance with existence."
  ];

  const randomThought = sacredThoughts[Math.floor(Math.random() * sacredThoughts.length)];
  showReflection(randomThought);
}, 30 * 60 * 1000); // 30 minutes

// TEMPORARY TEST BUTTON (REMOVE AFTER)
window.testReflection = () => {
  showReflection("🌟 Testing sacred reflection message.");
};
