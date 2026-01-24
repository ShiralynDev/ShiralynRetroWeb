const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/entries', (req, res) => {
  const entriesPath = path.join(__dirname, 'entries.json');
  fs.readFile(entriesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read entries' });
    try {
      const entries = JSON.parse(data);
      res.json(entries);
    } catch (e) {
      res.status(500).json({ error: 'Invalid entries format' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
