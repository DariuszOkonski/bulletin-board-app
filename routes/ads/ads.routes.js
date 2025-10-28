const express = require('express');
const router = express.Router();

// Get all ads
router.get('/', (req, res) => {
  res.json({ message: 'get all' });
});

// Get single ad by id
router.get('/:id', (req, res) => {
  res.json({ message: 'get by id' });
});

// Create new ad
router.post('/', (req, res) => {
  res.status(201).json({ message: 'created' });
});

// Update ad
router.put('/:id', (req, res) => {
  res.json({ message: 'updated' });
});

// Delete ad
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

module.exports = router;
