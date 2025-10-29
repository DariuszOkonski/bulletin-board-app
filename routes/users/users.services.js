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

const updateById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    validateObjectId(id, 'User');

    // Find existing user
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 'USER_NOT_FOUND', 404);
    }

    const { login, password, avatar, phone, location } = req.body || {};

    // If login is changing, ensure uniqueness
    if (login && login !== user.login) {
      const existing = await User.findOne({ login }).lean().exec();
      if (existing && existing._id.toString() !== id) {
        throw new AppError(
          'User with this login already exists',
          'USER_EXISTS',
          409
        );
      }
      user.login = login;
    }

    // If password provided, hash it before saving
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    if (avatar !== undefined) user.avatar = avatar;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;

    // Save changes (will run validators)
    const saved = await user.save();

    const userToReturn = saved.toJSON ? saved.toJSON() : saved;

    return res.json({ success: true, data: userToReturn });
  } catch (error) {
    // Handle cast errors separately
    if (error.name === 'CastError') {
      return handleError(
        new AppError('Invalid user ID format', 'INVALID_ID', 400),
        res,
        400
      );
    }
    return handleError(error, res, error.statusCode);
  }
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
