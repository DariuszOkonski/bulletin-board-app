const express = require('express');
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require('./ads.services');
const imageUpload = require('../../utils/imageUpload');

const router = express.Router();

// Get all ads
router.get('/', getAll);

// Get single ad by id
router.get('/:id', getById);

// Create new ad
router.post('/', imageUpload.single('picture'), create);

// Update ad
router.put('/:id', imageUpload.single('picture'), updateById);

// Delete ad
router.delete('/:id', deleteById);

module.exports = router;
