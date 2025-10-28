const { Schema, model } = require('mongoose');

const AdSchema = new Schema(
  {
    title: { type: String, required: true, min: 10, max: 50 },
    content: { type: String, required: true, min: 20, max: 1000 },
    publicationDate: { type: Date, default: Date.now },
    picture: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Ad', AdSchema);
