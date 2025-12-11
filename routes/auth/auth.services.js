const { Ad, User, Session } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');
const bcrypt = require('bcrypt');
const getImageFileType = require('../../utils/getImageFileType');
const fs = require('fs');
const path = require('path');

const MAX_FILESIZE = 500 * 1024;

const getUser = async (req, res) => {
  return res.json({
    success: true,
    data: { login: req.session.user.login, id: req.session.user.id },
  });
};

const register = async (req, res) => {
  try {
    const { login, password, phone, location } = req.body || {};
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const avatar = req.file.filename;
    const fileSize = parseInt(req.headers['content-length']);

    // Validate required fields
    const missing = [];
    if (!login) missing.push('login');
    if (!password) missing.push('password');
    if (!avatar) {
      missing.push('avatar');
    } else {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)) {
        missing.push('avatar-format-wrong');
      }
    }

    if (fileSize > MAX_FILESIZE) {
      missing.push('file size to big');
    }

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
    try {
      const uploadedFilePath = req.file
        ? req.file.path || path.join(__dirname, '../../public/uploads', avatar)
        : null;

      if (req.file && uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }
    } catch (unlinkErr) {
      console.error('Failed to remove uploaded file: ', unlinkErr);
    }

    return handleError(error, res, error.statusCode);
  }
};

const logout = async (req, res) => {
  // req.session.user = undefined;
  req.session.destroy();

  if (process.env.NODE_ENV !== 'production') {
    await Session.deleteMany();
  }

  return res.json({ success: true, data: { message: 'You are logged out' } });
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body || {};

    // Validate required fields
    const missing = [];
    if (!login) missing.push('login');
    if (!password) missing.push('password');

    if (missing.length) {
      throw new AppError(
        `Missing required field(s): ${missing.join(', ')}`,
        'MISSING_FIELDS',
        400,
        { missing }
      );
    }

    // Find user by login
    const user = await User.findOne({ login }).exec();
    if (!user) {
      throw new AppError('User not found', 'USER_NOT_FOUND', 404);
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError('Invalid credentials', 'INVALID_CREDENTIALS', 401);
    }

    // req.session.login = user.login;
    req.session.user = {
      login: user.login,
      id: user.id,
    };

    return res.json({
      success: true,
      data: {
        message: 'User logged in',
        user,
      },
    });
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
};

module.exports = {
  getUser,
  register,
  login,
  logout,
};
