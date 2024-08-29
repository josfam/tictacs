// entry point
require('dotenv').config(); // load in environment variables from .env file

const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const apiAuthRoutes = require('./routes/api/v1/auth');
const apiUserRoutes = require('./routes/api/v1/users');
const pageRoutes = require('./routes/pages');
const session = require('express-session'); // generating session ids & cookies
const MongoStore = require('connect-mongo');

// mongodb
const mongoose = require('mongoose');
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const dbname = process.env.DB_NAME;

// app instance
const app = express();
const port = 3000;

const server = createServer(app); // http server

const sessionMiddleWare = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day (milliseconds)
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: `mongodb://${dbhost}:${dbport}/${dbname}`,
    collectionName: 'user_sessions'
  })
}
);

// middleware for sessions
app.use(sessionMiddleWare);

// middleware and api routes
app.use(express.static('public')); // serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // json parsing
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/users/', apiUserRoutes);
app.use('/', pageRoutes);

const io = new Server(server); // socket io server
io.engine.use(sessionMiddleWare);

// track users who are currently online.
players_online = new Set();

// socketio connections
io.on('connection', (socket) => {
  const session = socket.request.session;
  const username = session.username;
  console.log(`${username} has connected!`);
  // give the user back their own username
  socket.emit('get-your-name', username);
  ;

  if (!players_online.has(username)) {
    players_online.add(username);
    socket.emit('get-players-online', Array.from(players_online));
    io.emit('player-joined', {username});
  }
  console.log('New connection:', players_online) // DEBUG

  socket.on('logout', () => {
    // remove from online players
    if (players_online.has(username)) {
      players_online.delete(username);
      io.emit('player-left', username);
    }
    console.log('Logout:', players_online)
  });

  socket.on('disconnect', () => {
    // remove from online players
    if (players_online.has(username)) {
      players_online.delete(username);
      io.emit('player-left', username);
      console.log('Disconnect:', players_online)
    }
  });
});

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
