const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postID: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: Array,
      required: true,
    },
    duration: {
      type: Array,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    plan: {
      type: Array,
    },
    role: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { collection: 'posts' }
);

module.exports = mongoose.model('Post', postSchema);
