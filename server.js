const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const entriesFile = path.join(__dirname, 'entries.json');

function loadEntries() {
  if (!fs.existsSync(entriesFile)) return [];
  return JSON.parse(fs.readFileSync(entriesFile, 'utf-8'));
}

function saveEntries(entries) {
  fs.writeFileSync(entriesFile, JSON.stringify(entries, null, 2));
}

app.get('/api/entries', (req, res) => {
  const entries = loadEntries();
  res.json(entries);
});

app.post('/api/entries', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  const entries = loadEntries();
  const newEntry = {
    name,
    message,
    date: new Date().toLocaleString()
  };
  entries.unshift(newEntry);
  saveEntries(entries);

  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Guestbook server running at http://localhost:${PORT}`);
});
