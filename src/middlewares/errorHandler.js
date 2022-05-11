module.exports = (err, req, res, next) => {
  let { message, statusCode = 500 } = err;

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    status: 'error',
    err,
  });

  next();
};
