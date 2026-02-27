const express = require('express');
const { login, signup, getMe } = require('../controllers/authController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getMe);

module.exports = router;
