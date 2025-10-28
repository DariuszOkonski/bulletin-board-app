const mongoose = require('mongoose');

// Import all schemas
const UserSchema = require('./schemas/User.schema');
const AdSchema = require('./schemas/Ad.schema');

// Register models
mongoose.model('User', UserSchema);
mongoose.model('Ad', AdSchema);

// Export models
module.exports = {
  User: mongoose.model('User'),
  Ad: mongoose.model('Ad'),
};
