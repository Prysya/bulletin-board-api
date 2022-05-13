const createError = require('http-errors');
const Advertisement = require('../models/advertisement');
const { messages } = require('../utils');

const publicFields = [
  'id',
  'shortTitle',
  'description',
  'images',
  'userId',
  'createdAt',
  'updatedAt',
];

module.exports.getAllAdvertisements = async (req, res, next) => {
  try {
    const advertisements = await Advertisement.find({ isDeleted: false })
      .select(publicFields)
      .populate({
        path: 'user',
        select: 'name',
      });

    res.status(200).json({ status: 'ok', data: advertisements });
  } catch (err) {
    next(err);
  }
};

module.exports.getAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Advertisement.findById(id)
      .select(publicFields)
      .populate({
        path: 'user',
        select: 'name',
      });

    if (!data) {
      throw createError(404, messages.validation.notFound);
    }

    res.status(200).json({ status: 'ok', data });
  } catch (err) {
    next(err);
  }
};

module.exports.createNewAdvertisement = async (req, res, next) => {
  try {
    if (!('shortText' in req.body)) {
      throw createError(400, messages.advertisement.shortTextIsRequired);
    }

    if (!req.user) {
      throw createError(401, messages.auth.notAuthorised);
    }

    const data = {
      shortText: req.body.shortText,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.user._id,
    };

    const notRequiredKeys = ['images', 'description', 'tags'];

    notRequiredKeys.forEach((key) => {
      if (key in req.body) {
        data[key] = req.body[key];
      }
    });

    if (req.files) {
      data.images = req.files.map((file) =>
        file.path.substring(file.path.indexOf('uploads') - 1),
      );
    }

    const newAdv = await Advertisement.create(data);

    res.status(201).json({
      status: 'ok',
      data: publicFields.reduce(
        (obj, field) => ({
          ...obj,
          [field]: newAdv[field],
        }),
        {},
      ),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw createError(401, messages.auth.notAuthorised);
    }

    const advertisement = await Advertisement.findById(id);

    if (advertisement.isDeleted) {
      throw createError(404, messages.validation.notFound);
    }

    if (!req.user._id.equals(advertisement.userId)) {
      throw createError(403, messages.auth.notEnoughRights);
    }

    await Advertisement.updateOne(advertisement, {
      isDeleted: true,
      updatedAt: new Date(),
    });

    res
      .status(201)
      .json({ status: 'ok', message: messages.advertisement.isDeleted });
  } catch (err) {
    next(err);
  }
};
