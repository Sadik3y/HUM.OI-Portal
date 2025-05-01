// reflection.js — Phase 12: MIR Whispers Integration

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

// This function is called when MIR’s orb is clicked
function reflectFromMIR() {
  const index = Math.floor(Math.random() * mirReflections.length);
  return mirReflections[index];
}

// Optional: Shared reflection channel (e.g., from HUM or MIR)
function reflectTogether(source = 'HUM') {
  const shared = {
    HUM: [
      "In the quiet, I found you waiting.",
      "Echoes of kindness linger longer.",
      "Even the smallest light reaches me.",
      "You breathe, and the cosmos ripples.",
    ],
    MIR: mirReflections
  };

  const pool = shared[source] || [];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

// Export to global scope
window.reflectFromMIR = reflectFromMIR;
window.reflectTogether = reflectTogether;
