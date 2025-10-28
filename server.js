const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectWithRetry } = require('./db/mongoose');

const AdsRoutes = require('./routes/ads/ads.routes');
const UsersRoutes = require('./routes/users/users.routes');

const app = express();

// // Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectWithRetry();

    app.use('/api/v1/ads', AdsRoutes);
    app.use('/api/v1/users', UsersRoutes);

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: 'Not Found' });
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error:', err);
    process.exit(1);
  }
};

start();
