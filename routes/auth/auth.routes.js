const express = require('express');
const { getUser, register, login } = require('./auth.services');

const router = express.Router();

router.get('/login', login);

router.get('/:id', getUser);

router.post('/', register);

module.exports = router;
