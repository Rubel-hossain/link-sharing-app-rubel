require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config');

const userRoutes = require('./routes/user');
const linksRoutes = require('./routes/links');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use(cors());
app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(cookieParser());
app.use('/api/auth', userRoutes);
app.use('/api/links', linksRoutes);

app.get('*', (req, res, next) => {
  return res.sendFile(
    path.join(__dirname, '..', 'frontend', 'dist', 'index.html')
  );
});

app.use((error, req, res, next) => {
  if (error) {
    const message = error.message || 'Something went wrong. Try again later.';
    const status = error.status || 500;
    return res.status(status).send(message);
  }
});

app.listen(PORT, () => {
  console.log(`server started on port localhost:${PORT}`);
});
