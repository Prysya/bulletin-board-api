const escape = require('escape-html');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, contactPhone } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: escape(name),
      email,
      password: hash,
      contactPhone: escape(contactPhone),
    });

    res.status(201).send({
      status: 'ok',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        contactPhone: user.contactPhone,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const { contactPhone, id, email, name } = req.user;

    const data = {
      id,
      email,
      name,
    };

    if (contactPhone !== 'undefined') {
      data.contactPhone = contactPhone;
    }

    res.status(200).json({
      status: 'ok',
      data,
    });
  } catch (err) {
    next(err);
  }
};
