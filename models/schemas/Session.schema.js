const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
  expires: { type: Date, required: true },
  session: { type: String, required: true },
});

module.exports = SessionSchema;
