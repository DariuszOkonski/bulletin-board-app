const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
