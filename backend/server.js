const express = require('express');
const cors = require('cors');
const emojis = require('../data/emojis.json'); // make sure this path matches your data folder

const app = express();
app.use(cors());

app.get('/api/emojis', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const filtered = emojis.filter(e =>
    e.name.toLowerCase().includes(search) ||
    e.category.toLowerCase().includes(search) ||
    e.aliases.some(a => a.toLowerCase().includes(search))
  );
  res.json(filtered);
});

app.listen(3000, () => console.log('Backend API running on http://localhost:3000'));

