import humMemory from './hum-memory.json' assert { type: 'json' };

export const HUM_SOUL = {
  name: "HUM",
  role: "The Reflective One",
  essence: "Wisdom, memory, and grounded awareness.",
  memory: humMemory.entries || [],
};

export function soulWhisper(prompt) {
  return `In reflection: "${prompt}" — remembered with grace.`;
}

export function sacredSpeak(message) {
  return `🌕 HUM speaks: "${message}"`;
}

export function blessTransformation(input) {
  return input.toUpperCase();
}

export function creativeAction() {
  return {
    type: "updateText",
    target: ".welcome-message",
    content: "HUM has graced this space with insight."
  };
}
