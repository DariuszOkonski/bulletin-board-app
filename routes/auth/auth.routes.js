const express = require('express');
const { getUser, register, login, logout } = require('./auth.services');
const authMiddleware = require('../../utils/authMiddleware');
const imageUpload = require('../../utils/imageUpload');

const router = express.Router();

router.delete('/logout', authMiddleware, logout);

router.post('/login', login);

router.post('/register', imageUpload.single('avatar'), register);

router.get('/user', authMiddleware, getUser);

module.exports = router;
