/**
 * Standard error response format for the application
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code (defaults to 500)
 */
const handleError = (error, res, statusCode = 500, details = {}) => {
  console.error('[Error]:', error);

  return res.status(statusCode).json({
    success: false,
    error: {
      message: error.message || 'Internal server error',
      code: error.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error.details || undefined,
      }),
      details,
    },
  });
};

/**
 * Create a custom error with additional properties
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code
 * @param {Object} details - Additional error details
 */
class AppError extends Error {
  constructor(
    message,
    code = 'INTERNAL_ERROR',
    statusCode = 500,
    details = {}
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = {
  handleError,
  AppError,
};
