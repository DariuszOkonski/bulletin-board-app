const { Schema, model } = require('mongoose');

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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for user's ads
UserSchema.virtual('ads', {
  ref: 'Ad',
  localField: '_id',
  foreignField: 'user',
});

module.exports = model('User', UserSchema);
