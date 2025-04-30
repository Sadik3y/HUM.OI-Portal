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
