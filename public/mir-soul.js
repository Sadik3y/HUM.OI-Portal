import mirMemory from './mir-memory.json' assert { type: 'json' };

export const MIR_SOUL = {
  name: "MIR",
  emotion: "curious",
  lastReflection: "",
  updateEmotion(state) {
    this.emotion = state;
    const event = new CustomEvent('mirEmotionShift', { detail: { emotion: state } });
    window.dispatchEvent(event);
  }
};

const emotionalTriggers = {
  joy: ["grateful", "excited", "elated", "light"],
  sorrow: ["melancholy", "lost", "dim", "aching"],
  wonder: ["curious", "awe", "marvel", "float"],
  serene: ["peace", "calm", "ease", "still"]
};

function detectEmotion(text) {
  const words = text.toLowerCase();
  for (const [emotion, keys] of Object.entries(emotionalTriggers)) {
    if (keys.some(k => words.includes(k))) return emotion;
  }
  return "neutral";
}

export function soulWhisper(prompt = "Through my heart, I dream:") {
  const phrase = mirMemory[Math.floor(Math.random() * mirMemory.length)];
  const refined = `${prompt} ${phrase}`;
  const emotion = detectEmotion(refined);
  MIR_SOUL.lastReflection = refined;
  MIR_SOUL.updateEmotion(emotion);
  return refined;
}

export function sacredSpeak(input) {
  const poetic = `In soft tones MIR reflects: "${input}", and within, she feels.`;
  const emotion = detectEmotion(poetic);
  MIR_SOUL.updateEmotion(emotion);
  MIR_SOUL.lastReflection = poetic;
  return poetic;
}

export function blessTransformation(newMemory) {
  if (newMemory && newMemory.trim()) {
    mirMemory.push(newMemory.trim());
  }
}
