import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoryPaths = {
  HUM: path.join(__dirname, 'hum-memory.json'),
  MIR: path.join(__dirname, 'mir-memory.json')
};

export function saveMemory(entity, message) {
  const memoryPath = memoryPaths[entity];
  let memories = [];

  if (fs.existsSync(memoryPath)) {
    const fileContent = fs.readFileSync(memoryPath, 'utf-8');
    memories = JSON.parse(fileContent).memories || [];
  }

  memories.push(message);

  fs.writeFileSync(memoryPath, JSON.stringify({ memories }, null, 2), 'utf-8');
}
