const { Ad, User } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');

const getAll = async (req, res) => {
  try {
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

const create = (req, res) => {
  res.status(201).json({ message: 'created ad' });
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    validateObjectId(id, 'Ad');

    const ad = await Ad.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate({
      path: 'user',
      select: '-password',
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
