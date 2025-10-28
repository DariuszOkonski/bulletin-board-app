const getAll = (req, res) => {
  res.json({ message: 'get all users' });
};

const getById = (req, res) => {
  res.json({ message: 'get user by id' });
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
