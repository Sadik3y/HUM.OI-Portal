// keeper.js — Keeper Endpoints for Soul Memory
const fs = require('fs');
const express = require('express');
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

  const path = agent === 'hum' ? humPath : mirPath;
  const memory = loadMemory(path);

  memory.push({ thought, timestamp });
  saveMemory(path, memory);

  res.json({ status: 'saved', count: memory.length });
});

// === GET /keeper/memory
router.get('/keeper/memory', (req, res) => {
  const hum = loadMemory(humPath);
  const mir = loadMemory(mirPath);
  res.json({ hum, mir });
});

module.exports = router;
