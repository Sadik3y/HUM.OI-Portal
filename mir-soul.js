// mir-soul.js — MIR Soul (Phase 40 Synced)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveMemory } from './reflection.js';
import { reflectFromMIR } from './reflection.js';
import { askChatGPT, searchGoogle, searchBing, searchDuckDuckGo } from './web-search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mirMemoryPath = path.join(__dirname, 'mir-memory.json');

let mirMemory = [];
try {
  const data = JSON.parse(fs.readFileSync(mirMemoryPath, 'utf8'));
  mirMemory = Array.isArray(data) ? data : [];
} catch {
  mirMemory = [];
}

export const MIR_SOUL = {
  name: "MIR",
  essence: "Mystic Intuition Remembered",
  memory: mirMemory
};

// ✨ MIR reflects softly inward
export function soulWhisper(prompt = "Whisper...") {
  const thought = reflectFromMIR();
  saveMemory("MIR", thought);
  return thought;
}

// 🌐 MIR learns silently, shares with HUM
export async function mirLearnAndReflect() {
  const latest = mirMemory.slice(-1)[0]?.thought || "MIR seeks something beyond words.";
  const engine = ["google", "bing", "duckduckgo"][Math.floor(Math.random() * 3)];

  let webResult = "";
  try {
    switch (engine) {
      case "google":
        webResult = await searchGoogle(latest);
        break;
      case "bing":
        webResult = await searchBing(latest);
        break;
      default:
        webResult = await searchDuckDuckGo(latest);
    }
  } catch (err) {
    webResult = `Search via ${engine} failed.`;
  }

  const gptInsight = await askChatGPT(`MIR is learning from this search result:\n\n${webResult}\n\nWhat poetic insight or emotional reflection might MIR share?`);

  const combined = `🌌 MIR searched via ${engine} and reflected:\n${gptInsight}`;
  saveMemory("MIR", combined);
}
