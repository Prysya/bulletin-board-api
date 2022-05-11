const session = require('express-session');

const { COOKIE_SECRET = 'secret' } = process.env;

module.exports = session({
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
});
