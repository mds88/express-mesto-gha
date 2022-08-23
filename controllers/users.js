const User = require('../models/user');

function handleError(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `StatusCode: 400 - Ошибка валидации данных! ${err}` });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: `StatusCode: 400 - Некорректные данные в запросе! ${err}` });
  }
  return res.status(500).send({ message: `StatusCode: 500 - Произошла ошибка: ${err}` });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleError(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'StatusCode: 404 - Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'StatusCode: 404 - Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'StatusCode: 404 - Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
