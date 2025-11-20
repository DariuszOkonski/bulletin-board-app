const mongoose = require('mongoose');

// Import all schemas
const UserSchema = require('./schemas/User.schema');
const AdSchema = require('./schemas/Ad.schema');
const SessionSchema = require('./schemas/Session.schema');

// Register models
mongoose.model('User', UserSchema);
mongoose.model('Ad', AdSchema);
mongoose.model('Session', SessionSchema);

// Export models
module.exports = {
  User: mongoose.model('User'),
  Ad: mongoose.model('Ad'),
  Session: mongoose.model('Session'),
};
