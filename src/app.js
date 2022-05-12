const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const expressSession = require('./middlewares/expressSession');
const { passport } = require('./middlewares/passport');
const cors = require('./middlewares/cors');
const parsers = require('./middlewares/parsers');
const rateLimiter = require('./middlewares/rate-limiter');
const { chatSocket } = require('./controllers/chatSocket');

const router = require('./routes');
const { messages } = require('./utils');

require('dotenv').config();

/**
 * Variables
 * */
const {
  PORT = 3000,
  DB_USERNAME = 'root',
  DB_PASSWORD = 'password',
  DB_NAME = 'library_database',
  DB_HOST = 'mongodb://localhost:27017',
} = process.env;

/**
 * Server variable
 * */
const app = express();

const server = http.createServer(app);

/**
 * Routes
 * */

app.use(cors);
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

app.use(expressSession);
app.use(parsers);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:63342',
    credentials: true,
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(expressSession));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error(messages.auth.notAuthorised));
  }
});

io.on('connection', chatSocket);

(async () => {
  try {
    await mongoose.connect(DB_HOST, {
      user: DB_USERNAME,
      pass: DB_PASSWORD,
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // eslint-disable-line
    });
  } catch (e) {
    console.log('Starting error: ',e); // eslint-disable-line
  }
})();
