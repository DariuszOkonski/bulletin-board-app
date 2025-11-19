const express = require('express');
const { getUser, createUser, login } = require('./auth.services');

const router = express.Router();

router.get('/login', login);

router.get('/:id', getUser);

router.post('/', createUser);

module.exports = router;
