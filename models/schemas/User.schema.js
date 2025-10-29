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
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        // remove sensitive/internal fields
        delete ret.password;
        delete ret.__v;
        // keep id instead of _id
        if (ret._id) {
          ret.id = ret._id;
          delete ret._id;
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        if (ret._id) {
          ret.id = ret._id;
          delete ret._id;
        }
        return ret;
      },
    },
  }
);

module.exports = UserSchema;
