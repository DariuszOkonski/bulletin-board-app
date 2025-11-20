const express = require('express');
const { getUser, register, login, logout } = require('./auth.services');
const authMiddleware = require('../../utils/authMiddleware');

const router = express.Router();

router.delete('/logout', authMiddleware, logout);

router.post('/login', login);

router.post('/register', register);

router.get('/user', authMiddleware, getUser);

module.exports = router;
