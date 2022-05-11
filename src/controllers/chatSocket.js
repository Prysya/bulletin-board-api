const Chat = require('../models/chat');

module.exports.chatSocket = (socket) => {
  const { session } = socket.request;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
  console.log(`Socket connected: ${socket.id}`);

  socket.on('whoami', () => {
    socket.emit('whoareyou', socket.request.user ? socket.request.user : '');
  });

  socket.on('getHistory', async (msg) => {
    const chat = await Chat.find(msg);
    socket.emit('chatHistory', chat);
  });

  socket.on('sendMessage', async (msg) => {
    const message = await Chat.sendMessage(msg);
    socket.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
