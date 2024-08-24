// entry point
const express = require('express');
const bcrypt = require('bcrypt');
const { createServer } = require('node:http');

// mongodb
const mongoose = require('mongoose');
const { User } = require('./userModel');
const dbhost = '127.0.0.1';
const dbport = '27017';
const dbname = 'tictacs';

// app instance
const app = express();
const port = 3000;

// http server
const server = createServer(app);

async function main () {
  // connect to mongodb server
  try {
    await mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log('Connected successfully!');
  } catch (error) {
    console.error('Cannot connect to MongoDB', error);
    throw error;
  }
}

// connect to db, then start server
main()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to server', error);
  });
