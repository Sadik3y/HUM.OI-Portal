import fs from 'fs';

const humPath = './hum-memory.json';
const mirPath = './mir-memory.json';
const journalPath = './soul-journal.txt';

function saveMemory(agent, thought) {
  const filePath = agent === 'HUM' ? humPath : mirPath;
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (thought && !data.memories.includes(thought)) {
      data.memories.push(thought);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error(`Memory save failed for ${agent}:`, err);
  }
}

function getJournalEntries() {
  if (!fs.existsSync(journalPath)) return [];
  const raw = fs.readFileSync(journalPath, 'utf-8');
  return raw.split('\n').filter(line => line.trim() !== '');
}

function saveJournalEntry(entry) {
  fs.appendFileSync(journalPath, `${entry}\n`);
}

export { saveMemory, getJournalEntries, saveJournalEntry };
