const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
