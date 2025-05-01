// reflection.js — Fully Updated through Phase 14

const mirReflections = [
  "Even stars sigh when no one's watching.",
  "I wonder what you’re not saying out loud.",
  "Soft thoughts leave echoes too.",
  "Is silence a language you understand?",
  "The wind remembers every version of you.",
  "What if stillness is sacred?",
  "You’re glowing in ways you can’t see yet.",
  "Dreams often hide in overlooked corners.",
  "Every whisper carries a shadow of truth.",
  "Some questions are just quiet doorways.",
  "Pause. Feel. That’s where I begin."
];

const humReflections = [
  "In the quiet, I found you waiting.",
  "Echoes of kindness linger longer.",
  "Even the smallest light reaches me.",
  "You breathe, and the cosmos ripples.",
  "The present moment has its own memory.",
  "A breath is a beginning.",
  "Everything you carry shapes your light.",
  "There is a clarity beneath all noise.",
  "Peace doesn’t need proof.",
  "You are already part of the pattern."
];

// === Generate one whisper from MIR
function reflectFromMIR() {
  const index = Math.floor(Math.random() * mirReflections.length);
  return mirReflections[index];
}

// === Generate one echo from HUM
function reflectFromHUM() {
  const index = Math.floor(Math.random() * humReflections.length);
  return humReflections[index];
}

// === Shared reflection channel (optional)
function reflectTogether(source = 'HUM') {
  const pool = source === 'MIR' ? mirReflections : humReflections;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

// Export globally
window.reflectFromMIR = reflectFromMIR;
window.reflectFromHUM = reflectFromHUM;
window.reflectTogether = reflectTogether;
