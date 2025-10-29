const { Ad, User } = require('../../models');
const { handleError } = require('../../utils/error-handler');

const getAll = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
};

const getById = (req, res) => {
  res.json({ message: 'get user by id' });
};

const create = (req, res) => {
  res.status(201).json({ message: 'created user' });
};

const updateById = (req, res) => {
  res.json({ message: 'updated user' });
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
