const { ObjectId } = require('mongodb');
const createError = require('http-errors');

const messages = require('../utils/messages');

module.exports.verifyById = (req, res, next) =>
  ObjectId.isValid(req.params.id)
    ? next()
    : next(createError(400, messages.advertisement.idIsNotValid));
