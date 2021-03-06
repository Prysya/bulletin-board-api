const { ObjectId } = require('mongodb');
const Chat = require('../models/chat');
const { messages } = require('../utils');

module.exports.chatSocket = (socket) => {
  const { session } = socket.request;
  session.socketId = socket.id;
  session.save();

  console.log(`Socket connected: ${socket.id}`);

  socket.join(socket.request.user._id);

  Chat.subscribe(async (chatId, message) => {
    try {
      const { users } = await Chat.findById(chatId);

      socket.to(users[0]).to(users[1]).emit('newMessage', message);
    } catch (err) {
      console.log('Subscribed error: ', err);
    }
  });

  socket.on('getHistory', async (id) => {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error(messages.advertisement.idIsNotValid);
      }

      const chat = await Chat.find([socket.request.user._id, id]);

      socket.emit('chatHistory', chat.messages);
    } catch {
      socket.emit('chatHistory', null);
    }
  });

  socket.on('sendMessage', async (msg) => {
    try {
      const message = await Chat.sendMessage({
        ...msg,
        author: socket.request.user._id,
      });
      socket.emit('newMessage', message);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
