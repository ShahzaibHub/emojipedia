const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // allow all origins
app.use(express.json());

// Serve emojis
app.get('/api/emojis', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/emojis.json'));
});

// Export app for Jest testing
module.exports = app;

// Start server only if run directly (not when testing)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

