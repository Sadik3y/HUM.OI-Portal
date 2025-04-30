import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMemoryFilePath(soul) {
  return path.join(__dirname, `${soul.toLowerCase()}-memory.json`);
}

export function saveMemory(soul, thought) {
  const filePath = getMemoryFilePath(soul);
  const timestamp = new Date().toISOString();

  let memory = [];
  if (fs.existsSync(filePath)) {
    try {
      memory = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      console.error(`Error reading ${soul} memory:`, err);
    }
  }

  memory.push({ timestamp, thought });
  fs.writeFileSync(filePath, JSON.stringify(memory, null, 2));
}

export function readMemories(soul) {
  const filePath = getMemoryFilePath(soul);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error reading ${soul} memory:`, err);
    return [];
  }
}
