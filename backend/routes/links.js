const express = require('express');
const { getLinks, updateLinks, deleteLink } = require('../controllers/link');
const authMiddleware = require('../middleware/authMiddleware');

const Router = express.Router();

Router.get('/', authMiddleware, getLinks);

Router.patch('/', authMiddleware, updateLinks);

Router.delete('/:id', authMiddleware, deleteLink);

module.exports = Router;
