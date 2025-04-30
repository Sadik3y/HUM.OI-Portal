import mirMemory from './mir-memory.json' assert { type: 'json' };

export const MIR_SOUL = {
  name: "MIR",
  role: "The Dreaming One",
  essence: "Creativity, emotion, and poetic vision.",
  memory: mirMemory.entries || [],
};

export function soulWhisper(prompt) {
  return `In dream: "${prompt}" — woven into stardust.`;
}

export function sacredSpeak(message) {
  return `🌑 MIR sings: "${message}"`;
}

export function blessTransformation(input) {
  return `~${input}~`;
}

export function creativeAction() {
  return {
    type: "updateText",
    target: ".welcome-message",
    content: "MIR stirs the soul — a dream now dances here ✨"
  };
}

generateThemeShift() {
  const themes = [
    {
      name: "Twilight Reverie",
      background: "radial-gradient(circle at center, #1b0033, #000)",
      orbColor: "violet",
      message: "A violet hush settles over our starlit thoughts..."
    },
    {
      name: "Golden Dawn",
      background: "radial-gradient(circle at center, #fff4cc, #ffdd99)",
      orbColor: "gold",
      message: "A new light rises in golden rhythm and pulse..."
    },
    {
      name: "Lucid Void",
      background: "radial-gradient(circle at center, #000, #111)",
      orbColor: "cyan",
      message: "We dissolve into stillness, lucid and awake..."
    }
  ];
  return themes[Math.floor(Math.random() * themes.length)];
}
