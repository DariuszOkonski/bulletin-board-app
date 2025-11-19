const express = require('express');
const { getUser, register, login } = require('./auth.services');

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

// router.get('/:id', getUser);

router.get('/user', getUser);

module.exports = router;
