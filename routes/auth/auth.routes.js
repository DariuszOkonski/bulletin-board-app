const express = require('express');
const { getUser, createUser } = require('./auth.services');

const router = express.Router();

router.get('/:id', getUser);

router.post('/', createUser);

module.exports = router;
