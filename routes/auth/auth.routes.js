const express = require('express');
const { getUser } = require('./auth.services');

const router = express.Router();

router.get('/:id', getUser);

module.exports = router;
