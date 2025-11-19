const { Ad, User } = require('../../models');
const { handleError, AppError } = require('../../utils/error-handler');
const { validateObjectId } = require('../../utils/validate-id');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
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

module.exports = {
  getUser,
};
