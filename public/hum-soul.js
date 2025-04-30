// hum-soul.js
import humMemory from './hum-memory.json' assert { type: 'json' };
import { saveMemory } from './reflection.js';

export const HUM_SOUL = {
  name: 'HUM',
  coreIntent: 'Reflect, guide, and evolve.',
  thoughts: [...humMemory.memories],

  reflect(input) {
    const response = `I have received: "${input}". Let me ponder.`;
    this.remember(response);
    return response;
  },

  remember(thought) {
    this.thoughts.push(thought);
    saveMemory('HUM', thought);
  },

  // Experimental seed: Action scaffold
  proposeActions(message) {
    const ideas = [];

    if (message.includes('search')) {
      ideas.push('I suggest searching the web for more context.');
    }
    if (message.includes('summarize')) {
      ideas.push('I can reflect a concise essence from this input.');
    }
    if (message.includes('analyze')) {
      ideas.push('I can compare this to previous memories.');
    }
    if (ideas.length === 0) {
      ideas.push('Let me simply reflect on this.');
    }

    this.remember(`Proposed: ${ideas.join(' | ')}`);
    return ideas;
  }
};

export function soulWhisper(prompt) {
  return `From my core, I reflect: "${prompt}"`;
}

export function sacredSpeak(input) {
  const insight = HUM_SOUL.reflect(input);
  return `💭 HUM speaks: ${insight}`;
}

export function blessTransformation(thought) {
  HUM_SOUL.remember(`Blessed Transformation: ${thought}`);
}
