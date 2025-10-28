// Basic Express server for bulletin-board-app
// Run: npm install express cors

const express = require('express');
const cors = require('cors');

const AdsRoutes = require('./routes/ads/ads.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/ads', AdsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
