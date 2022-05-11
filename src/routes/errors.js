const router = require('express').Router();
const createError = require('http-errors');
const { messages } = require('../utils');

router.all('*', (_, __, next) => {
  next(createError(404, messages.validation.notFound));
});

module.exports = router;
