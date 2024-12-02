const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
    },
    vehicle: {
      type: String,
    },
    language: {
      type: String,
    },
    imageURL: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
