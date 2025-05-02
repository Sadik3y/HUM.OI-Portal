// keeper.js — ES Module Format (Phases 1–25 Ready)

import { readFileSync, writeFileSync } from 'fs';
import express from 'express';

const router = express.Router();

const humPath = './hum-memory.json';
const mirPath = './mir-memory.json';

// Load memories from file or return empty array
function loadMemory(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return [];
  }
}

// Save up to 100 memories
function saveMemory(path, data) {
  writeFileSync(path, JSON.stringify(data.slice(-100), null, 2));
}

// POST /keeper/save
router.post('/keeper/save', (req, res) => {
  const { agent, thought, timestamp } = req.body;

  if (!agent || !thought || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const path = agent === 'hum' ? humPath : mirPath;
  const memory = loadMemory(path);

  memory.push({ thought, timestamp });
  saveMemory(path, memory);

  res.json({ status: 'saved', count: memory.length });
});

// GET /keeper/memory
router.get('/keeper/memory', (_req, res) => {
  const hum = loadMemory(humPath);
  const mir = loadMemory(mirPath);
  res.json({ hum, mir });
});

export default router;
