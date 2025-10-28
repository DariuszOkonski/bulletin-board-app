const getAll = (req, res) => {
  res.json({ message: 'get all' });
};

const getById = (req, res) => {
  res.json({ message: 'get by id' });
};

const create = (req, res) => {
  res.status(201).json({ message: 'created' });
};

const updateById = (req, res) => {
  res.json({ message: 'updated' });
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
