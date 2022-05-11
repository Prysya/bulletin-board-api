const { Schema, model, ObjectId } = require('mongoose');
const createError = require('http-errors');
const { messages } = require('../utils');

const MessageSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  sentAt: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  readAt: {
    type: Date,
  },
});
const Message = model('message', MessageSchema);

const ChatSchema = new Schema({
  users: {
    type: [ObjectId, ObjectId],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  messages: {
    type: [MessageSchema],
  },
});

/**
 *
 * @memberOf ChatModule
 */
ChatSchema.statics.find = async function find(data) {
  const { author, receiver } = data;

  if (!author || !receiver) {
    throw createError(
      400,
      messages.schemas.isRequiredFunc(['author', 'receiver']),
    );
  }

  return this.findOne({ users: [author, receiver] });
};

/**
 *
 * @memberOf ChatModule
 */
ChatSchema.statics.getHistory = async function getHistory(id) {
  const chat = await this.findById(id);

  return chat ? chat.messages : null;
};

/**
 *
 * @memberOf ChatModule
 */
ChatSchema.statics.subscribe = async function subscribe(cb) {
  console.log(cb);
};

/**
 *
 * @memberOf ChatModule
 */
ChatSchema.statics.sendMessage = async function sendMessage(data) {
  const { author, receiver, text } = data;

  if (!author || !receiver || !text) {
    throw createError(
      400,
      messages.schemas.isRequiredFunc(['author', 'receiver', 'text']),
    );
  }

  const message = new Message({
    author,
    sentAt: new Date(),
    text,
  });

  const chat = await this.findOne({ users: [author, receiver] });

  if (!chat) {
    new this({
      users: [author, receiver],
      createdAt: new Date(),
      messages: [],
    }).save();
  }

  chat.messages.push(message);

  await chat.save();

  return message;
};

/** @class ChatModule */
const ChatModule = model('chat', ChatSchema);

module.exports = ChatModule;
