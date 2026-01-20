const checkHealth = (req, res) => {
  res.json({
    status: 'ok',
    message: 'backend is healthy',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  checkHealth
};
