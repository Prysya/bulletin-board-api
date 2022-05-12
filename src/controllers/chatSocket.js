const { ObjectId } = require('mongodb');
const Chat = require('../models/chat');
const { messages } = require('../utils');

module.exports.chatSocket = (socket) => {
  const { session } = socket.request;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
  console.log(`Socket connected: ${socket.id}`);

  socket.on('whoami', () => {
    socket.emit('whoareyou', socket.request.user ? socket.request.user : '');
  });

  socket.on('getHistory', async (id) => {
    try {
      if (ObjectId.isValid(id)) {
        throw new Error(messages.advertisement.idIsNotValid);
      }

      const chat = await Chat.find({ users: [socket.request.user._id, id] });
      socket.emit('chatHistory', chat.messages);
    } catch {
      socket.emit('chatHistory', null);
    }
  });

  socket.on('sendMessage', async (msg) => {
    const message = await Chat.sendMessage({
      ...msg,
      author: socket.request.user._id,
    });
    socket.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
