const { Ad, User } = require('../../models');

const getAll = async (req, res) => {
  try {
    // Add debugging
    console.log('Available models:', Object.keys(require('mongoose').models));

    const ads = await Ad.find().populate({
      path: 'user',
      model: 'User', // Explicitly specify the model
    });

    return res.json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({
      err: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

const getById = (req, res) => {
  res.json({ message: 'get ad by id' });
};

const create = (req, res) => {
  res.status(201).json({ message: 'created ad' });
};

const updateById = (req, res) => {
  res.json({ message: 'updated ad' });
};

const deleteById = (req, res) => {
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
