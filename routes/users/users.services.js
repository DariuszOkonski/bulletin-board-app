const { Ad, User } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');

const getAll = async (req, res) => {
  try {
    // Exclude password field as an extra safeguard (schema transform also strips it)
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    validateObjectId(id, 'User');

    const user = await User.findById(id).select('-password');

    if (!user) {
      throw new AppError('User not found', 'USER_NOT_FOUND', 404);
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
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
