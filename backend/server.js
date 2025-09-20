const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Read emojis JSON
const emojisPath = path.join(__dirname, "../data/emojis.json");
const emojis = JSON.parse(fs.readFileSync(emojisPath, "utf-8"));

// API endpoint
app.get("/api/emojis", (req, res) => {
  res.json(emojis);
});

// Only listen if not testing (prevents EADDRINUSE in Jest)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;

