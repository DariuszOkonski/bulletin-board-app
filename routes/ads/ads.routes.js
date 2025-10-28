const express = require('express');
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require('./ads.services');
const router = express.Router();

// Get all ads
router.get('/', getAll);

// Get single ad by id
router.get('/:id', getById);

// Create new ad
router.post('/', create);

// Update ad
router.put('/:id', updateById);

// Delete ad
router.delete('/:id', deleteById);

module.exports = router;
