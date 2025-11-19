const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectWithRetry } = require('./db/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const AdsRoutes = require('./routes/ads/ads.routes');
const UsersRoutes = require('./routes/users/users.routes');
const AuthRoutes = require('./routes/auth/auth.routes');

const app = express();

// // Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'xyz567',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/bulletin-board-app',
    }),
  })
);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectWithRetry();

    app.use('/api/v1/ads', AdsRoutes);
    app.use('/api/v1/users', UsersRoutes);
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
