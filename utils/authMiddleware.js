const authMiddleware = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    return res
      .status(401)
      .send({ success: false, message: 'You are not authorized' });
  }
};

module.exports = authMiddleware;
