const express = require('express');
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  login,
} = require('./users.services');

const router = express.Router();

router.get('/login', login);

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', create);

router.put('/:id', updateById);

router.delete('/:id', deleteById);

module.exports = router;

// TODO: create auth route
