const { Schema, model } = require('mongoose');
const createError = require('http-errors');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const { messages } = require('../utils');

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: messages.schemas.emailIsNotValid,
    },
    required: [true, messages.schemas.emailIsRequired],
    unique: true,
  },
  password: {
    type: String,
    required: [true, messages.user.passwordIsRequired],
    minlength: [8, messages.user.passwordTooShort],
    select: false,
  },
  name: {
    type: String,
    required: [true, messages.user.nameLengthIsNotValid],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name) {
        return !validator.isEmpty(name, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  contactPhone: {
    type: String,
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, { _id, ...other }) => ({ ...other }),
});

userSchema.plugin(uniqueValidator, {
  message: messages.user.emailIsNotUnique,
  type: 'mongoose-unique-validator',
});

/**
 *
 * @memberOf UserModule
 */
userSchema.statics.create = async function create(data) {
  return new this(data).save();
};

/**
 *
 * @memberOf UserModule
 */
userSchema.statics.findByEmail = function findByEmail(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw createError(401, messages.auth.wrongEmailOrPassword);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw createError(401, messages.auth.wrongEmailOrPassword);
        }

        return user;
      });
    });
};

/** @class UserModule */
const UserModule = model('user', userSchema);

module.exports = UserModule;
