require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Link = require('../models/link');
const { DEFAULT_IMAGE_DIRECTORY } = require('../utils/constants');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).send('User with the provided email already exist');
    }
    const encodedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      ...req.body,
      password: encodedPassword,
    });
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Error while registering a new user. Try again later.');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      return res.status(404).send('User with provided email does not exist');
    }

    const isEqual = await bcrypt.compare(password, existingUser.password);
    if (!isEqual) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    existingUser.token = token;
    await existingUser.save();

    return res
      .cookie('token', token, {
        secure: true,
        httpOnly: true,
      })
      .send(existingUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error during login. Try again later.');
  }
};

const logout = async (req, res) => {
  try {
    req.user.token = undefined;
    await req.user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error during logout. Try again later.');
  }
};

const getProfile = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error fetching profile. Try again later.');
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const profile = await User.findOne({
      email: new RegExp(req.params.profileId, 'gi'),
    });
    const links = await Link.find({
      user: profile._id,
    }).sort({ order: 1 });
    return res.send({
      profile: {
        _id: profile._id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        profileImage: profile.profileImage,
      },
      links,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Error fetching public profile. Try again later.');
  }
};

const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, email, profileImage } = req.body;
    if (profileImage) {
      // get public id of previously uploaded image to delete it
      const parts = req.user.profileImage.split('/');
      const fileName = parts[parts.length - 1];
      const publicId = fileName.split('.')[0];

      // delete previously uploaded image by passing public id
      await cloudinary.uploader.destroy(
        `${DEFAULT_IMAGE_DIRECTORY}/${publicId}`,
        {
          resource_type: 'image',
        }
      );
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: DEFAULT_IMAGE_DIRECTORY,
      });
      const { secure_url } = uploadResponse;
      req.user.profileImage = secure_url;
      await req.user.save();
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        first_name,
        last_name,
        email,
      },
      { new: true, runValidators: true }
    );
    return res.send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error updating profile. Try again later.');
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  getPublicProfile,
  updateProfile,
};
