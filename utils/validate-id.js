const mongoose = require('mongoose');
const { AppError } = require('./error-handler');

/**
 * Validates if the provided id is a valid MongoDB ObjectId
 * @param {string} id - The id to validate
 * @param {string} entityName - The name of the entity (e.g., 'User', 'Ad') for error message
 * @throws {AppError} If the id is not a valid ObjectId
 */
const validateObjectId = (id, entityName = 'resource') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(
      `Invalid ${entityName} ID format`,
      'INVALID_ID_FORMAT',
      400,
      { invalidId: id }
    );
  }
};

/**
 * Middleware to validate ObjectId parameter
 * @param {string} paramName - The parameter name to validate (default: 'id')
 * @param {string} entityName - The name of the entity for error message
 */
const validateIdParam = (paramName = 'id', entityName = 'resource') => {
  return (req, res, next) => {
    try {
      const id = req.params[paramName];
      validateObjectId(id, entityName);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  validateObjectId,
  validateIdParam,
};
