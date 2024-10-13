const express = require('express');
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  getPublicProfile,
} = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');

const Router = express.Router();

Router.post('/register', register);

Router.post('/login', login);

Router.post('/logout', authMiddleware, logout);

Router.get('/profile', authMiddleware, getProfile);

Router.get('/profile/:profileId', getPublicProfile);

Router.patch('/profile', authMiddleware, updateProfile);

module.exports = Router;
