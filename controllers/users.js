const User = require('../models/user');

function ViewError(err, res) { console.log(err);
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `Ошибка валидации данных! ${err}` });
  }
  return res.status(500).send({ message: `Произошла ошибка: ${err}` });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => ViewError(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => ViewError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => ViewError(err, res));
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => ViewError(err, res));
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      return res.send({ user });
    })
    .catch((err) => ViewError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
