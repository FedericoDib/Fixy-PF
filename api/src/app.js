const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
// require('./db.js');

const server = express();

server.name = 'API';
server.use(cors())
server.use(bodyParser.json({ limit: '50mb' }));
// server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(session({
  secret:'some',
  resave:false,
  saveUninitialized:false,
  // store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 *24
  }
}));
server.use(passport.initialize());
server.use(passport.session());

server.use('/', routes);



// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;