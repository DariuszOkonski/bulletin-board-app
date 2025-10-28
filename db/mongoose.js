// db/mongoose.js
const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bulletin-board-app';

async function connectWithRetry(retries = 5, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err.message);
      if (i + 1 === retries) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

module.exports = { mongoose, connectWithRetry };
