const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectWithRetry } = require('./db/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const AdsRoutes = require('./routes/ads/ads.routes');
const AuthRoutes = require('./routes/auth/auth.routes');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/bulletin-board-app',
    }),
  })
);

// this middleware has to be probably after endpoints
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectWithRetry();

    app.use('/api/v1/ads', AdsRoutes);
    app.use('/api/v1/auth', AuthRoutes);

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
