const { Schema, model, ObjectId } = require('mongoose');
const messages = require('../utils/messages');

const advertisementSchema = new Schema({
  shortText: {
    type: String,
    required: [true, messages.advertisement.shortTextIsRequired],
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

advertisementSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

advertisementSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, { _id, userId, ...other }) => ({ ...other }),
});

/**
 *
 * @memberOf AdvertisementModule
 */
advertisementSchema.statics.create = async function create(data) {
  return new this(data).save();
};

/**
 *
 * @memberOf AdvertisementModule
 */
advertisementSchema.statics.remove = async function remove(id) {
  return this.findByIdAndUpdate(id, { isDeleted: true }).exec();
};

/** @class AdvertisementModule */
const AdvertisementModule = model('advertisement', advertisementSchema);

module.exports = AdvertisementModule;
