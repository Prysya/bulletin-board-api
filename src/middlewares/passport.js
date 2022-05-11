const createError = require('http-errors');
const passport = require('passport');
const passportLocal = require('passport-local');

const User = require('../models/user');
const { messages } = require('../utils');

/*
 * Variables
 * */

const LocalStrategy = passportLocal.Strategy;

/**
 * Функция для проверки пользователя
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @param {function} done - коллбэк
 *
 * @requires User
 *
 * @return возвращает вызов колбэка с ошибкой или пользователем
 * */
const verify = async (email, password, done) => {
  try {
    const user = await User.findByEmail(email, password);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    verify,
  ),
);

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => {
  console.log('serializeUser', user);
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  console.log('deserializeUser', id);
  return User.findById(id, (err, currentUser) =>
    err ? cb(err) : cb(null, currentUser),
  );
});

const checkIsAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  throw createError(403, messages.auth.notAuthorised);
};

module.exports = {
  authenticate: passport.authenticate('local'),
  checkIsAuth,
  passport,
};
