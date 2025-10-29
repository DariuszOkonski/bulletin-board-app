const { Ad, User } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');
const bcrypt = require('bcrypt');

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

const create = async (req, res) => {
  try {
    const { login, password, avatar, phone, location } = req.body || {};

    // Validate required fields
    const missing = [];
    if (!login) missing.push('login');
    if (!password) missing.push('password');
    if (!avatar) missing.push('avatar');
    if (!phone) missing.push('phone');
    if (!location) missing.push('location');

    if (missing.length) {
      throw new AppError(
        `Missing required field(s): ${missing.join(', ')}`,
        'MISSING_FIELDS',
        400,
        { missing }
      );
    }

    // Check if user already exists (by login)
    const existing = await User.findOne({ login }).lean().exec();
    if (existing) {
      throw new AppError(
        'User with this login already exists',
        'USER_EXISTS',
        409
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create and save user
    const created = await User.create({
      login,
      password: hashed,
      avatar,
      phone,
      location,
    });

    // Ensure password is not sent back (schema transform also strips it)
    const userToReturn = created.toJSON ? created.toJSON() : created;

    return res.status(201).json({ success: true, data: userToReturn });
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
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
