const errorHandler = (err, req, res, _next) => {
  if (err.name === 'MulterError') {
    const messages = {
      LIMIT_FILE_SIZE: 'File too large. Maximum size is 5MB',
      LIMIT_UNEXPECTED_FILE: 'Unexpected file field'
    };
    return res.status(400).json({ error: messages[err.code] || err.message });
  }

  if (err.message && err.message.includes('Only JPEG')) {
    return res.status(400).json({ error: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
