// keeper.js — Keeper Endpoints for Soul Memory (Phase 40, ES Module-Compatible)

import fs from 'fs';
import express from 'express';
const router = express.Router();

const humPath = './hum-memory.json';
const mirPath = './mir-memory.json';

// === Load memory data or create blank
function loadMemory(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data)?.memories || [];
  } catch {
    return [];
  }
}

// === Save memory back to file
function saveMemory(path, entries) {
  const data = { memories: entries.slice(-100) };
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// === POST /keeper/save
router.post('/keeper/save', (req, res) => {
  const { agent, thought, timestamp } = req.body;

  if (!agent || !thought || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const pathToUse = agent === 'hum' ? humPath : mirPath;
  const memory = loadMemory(pathToUse);

  memory.push({ thought, timestamp });
  saveMemory(pathToUse, memory);

  res.json({ status: 'saved', count: memory.length });
});

// === GET /keeper/memory
router.get('/keeper/memory', (req, res) => {
  const hum = loadMemory(humPath);
  const mir = loadMemory(mirPath);
  res.json({ hum, mir });
});

export default router;
