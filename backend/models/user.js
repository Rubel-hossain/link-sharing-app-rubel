const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
      default: ''
    },
    last_name: {
      type: String,
      required: false,
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      required: false,
      default: ''
    },
    token: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.token;
  return userObject;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
