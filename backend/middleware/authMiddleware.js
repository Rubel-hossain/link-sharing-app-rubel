require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error();
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const validUser = await User.findOne({
      _id: user._id,
      token
    });
    if (!validUser) {
      throw new Error();
    }
    req.user = validUser;
    next();
  } catch (error) {
    return res.status(401).send('Authorization failed. Login again.');
  }
};

module.exports = authMiddleware;
