const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    autoIndex: true
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('Error connecting to database', error);
  });
