const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
});
module.exports = model('User', UserSchema);
