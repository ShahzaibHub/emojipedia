const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// Read emojis JSON
const emojisPath = path.join(__dirname, "../data/emojis.json");
const emojis = JSON.parse(fs.readFileSync(emojisPath, "utf-8"));

// API endpoint
app.get("/api/emojis", (req, res) => {
  res.json(emojis);
});

// Start server only if not testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Jest
module.exports = app;

