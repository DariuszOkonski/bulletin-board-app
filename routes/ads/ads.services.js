const { Ad, User } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');
const getImageFileType = require('../../utils/getImageFileType');
const fs = require('fs');
const path = require('path');

const MAX_FILESIZE = 500 * 1024 * 4;

const getAll = async (req, res) => {
  console.log('req: ', req);

  try {
    const ads = await Ad.find().populate({
      path: 'user',
      model: 'User', // Explicitly specify the model
    });

    // If a search query is provided, filter results by title, content or location (case-insensitive, partial match)
    const { search } = req.query;
    let filtered = ads;

    if (search && typeof search === 'string' && search.trim().length) {
      // escape regex special chars in user input
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');

      filtered = ads.filter((ad) => {
        const title = ad.title ? String(ad.title) : '';
        const content = ad.content ? String(ad.content) : '';
        const location = ad.user.location ? String(ad.user.location) : '';
        return regex.test(title) || regex.test(content) || regex.test(location);
      });
    }

    return res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    validateObjectId(id, 'Ad');

    // Find the ad
    const ad = await Ad.findById(id).populate({
      path: 'user',
      select: '-password', // Exclude password from user data
    });

    if (!ad) {
      throw new AppError('Advertisement not found', 'AD_NOT_FOUND', 404);
    }

    return res.json({
      success: true,
      data: ad,
    });
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
};

const create = async (req, res) => {
  try {
    const { title, content, price, user } = req.body || {};
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const picture = req.file.filename;
    const fileSize = parseInt(req.headers['content-length']);

    // Check required fields
    const missing = [];
    if (!title) missing.push('title');
    if (!content) missing.push('content');
    if (!picture) {
      missing.push('picture');
    } else {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)) {
        missing.push('avatar-format-wrong');
      }
    }
    if (fileSize > MAX_FILESIZE) {
      missing.push('file size to big');
    }
    if (price === undefined || price === null) missing.push('price');
    if (!user) missing.push('user');

    if (missing.length) {
      throw new AppError(
        `Missing required field(s): ${missing.join(', ')}`,
        'MISSING_FIELDS',
        400,
        { missing }
      );
    }

    // Basic value validation (mirror Ad schema rules)
    const fieldErrors = [];
    if (typeof title !== 'string' || title.length < 10 || title.length > 50) {
      fieldErrors.push('title must be a string (10-50 chars)');
    }
    if (
      typeof content !== 'string' ||
      content.length < 20 ||
      content.length > 1000
    ) {
      fieldErrors.push('content must be a string (20-1000 chars)');
    }
    const priceNumber = parseFloat(price);
    if (Number.isNaN(priceNumber) || !Number.isFinite(priceNumber)) {
      fieldErrors.push('price must be a valid number');
    }
    if (typeof picture !== 'string') {
      fieldErrors.push('picture must be a string (url/path)');
    }

    if (fieldErrors.length) {
      throw new AppError(
        'Invalid field values',
        'VALIDATION_ERROR',
        400,
        fieldErrors
      );
    }

    // Validate user id format and existence
    validateObjectId(user, 'User');
    const userExists = await User.findById(user).lean().exec();
    if (!userExists) {
      throw new AppError('User not found', 'USER_NOT_FOUND', 404);
    }

    // Create ad
    const ad = await Ad.create({
      title,
      content,
      picture,
      price: priceNumber,
      user,
    });

    // Populate user (without password)
    await ad.populate({ path: 'user', select: '-password' });

    return res.status(201).json({ success: true, data: ad });
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

    // Map mongoose validation errors
    if (error && error.name === 'ValidationError') {
      const details = Object.keys(error.errors || {}).map((k) => ({
        field: k,
        message: error.errors[k].message,
      }));
      return handleError(
        new AppError('Validation failed', 'VALIDATION_ERROR', 400, { details }),
        res,
        400
      );
    }
    // Duplicate key (if any unique constraints)
    if (error && error.code === 11000) {
      return handleError(
        new AppError('Duplicate key error', 'DUPLICATE_KEY', 409, {
          key: error.keyValue,
        }),
        res,
        409
      );
    }

    return handleError(error, res, error.statusCode, error.details);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const picture = req?.file?.filename;

    // Validate ID format
    validateObjectId(id, 'Ad');

    // Find existing ad
    const ad = await Ad.findById(id);

    if (!ad) {
      throw new AppError('Advertisement not found', 'AD_NOT_FOUND', 404);
    }

    if (
      picture &&
      !['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)
    ) {
      throw new AppError('Avatar wrong format', 'WRONG_FORMAT', 400);
    }

    // Do not allow changing the owner
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'user')) {
      // If user field is present in body and differs from current owner, reject
      const attempted = req.body.user;
      if (attempted && attempted.toString() !== ad.user.toString()) {
        throw new AppError(
          'Cannot change advertisement owner',
          'CANNOT_CHANGE_OWNER',
          403
        );
      }
      // Otherwise delete it to avoid accidental overwrite
      delete req.body.user;
    }

    // Apply allowed updates
    const allowed = ['title', 'content', 'picture', 'price'];
    allowed.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        ad[field] = req.body[field];
      }
    });

    // Save changes (will run schema validators)

    if (picture) {
      ad.picture = picture;
    }

    const saved = await ad.save();

    // Populate user before returning
    await saved.populate({ path: 'user', select: '-password' });

    return res.json({ success: true, data: saved });
  } catch (error) {
    // Handle mongoose validation errors
    if (error && error.name === 'ValidationError') {
      const details = Object.keys(error.errors || {}).map((k) => ({
        field: k,
        message: error.errors[k].message,
      }));
      return handleError(
        new AppError('Validation failed', 'VALIDATION_ERROR', 400, { details }),
        res,
        400
      );
    }
    if (error && error.code === 11000) {
      return handleError(
        new AppError('Duplicate key error', 'DUPLICATE_KEY', 409, {
          key: error.keyValue,
        }),
        res,
        409
      );
    }

    return handleError(error, res, error.statusCode);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    validateObjectId(id, 'Ad');

    const ad = await Ad.findByIdAndDelete(id);

    if (!ad) {
      throw new AppError('Advertisement not found', 'AD_NOT_FOUND', 404);
    }

    return res.status(204).send();
  } catch (error) {
    return handleError(error, res, error.statusCode);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
