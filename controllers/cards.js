const Card = require('../models/card');

function handleError(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `StatusCode: 400 - Ошибка валидации данных! ${err}` });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: `StatusCode: 400 - Некорректные данные в запросе! ${err}` });
  }
  return res.status(500).send({ message: `StatusCode: 500 - Произошла ошибка: ${err}` });
}

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => handleError(err, res));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'StatusCode: 404 - Карточка не найдена!' });
      }
      return res.send({ card });
    })
    .catch((err) => handleError(err, res));
};

const likeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'StatusCode: 404 - Карточка не найдена!' });
      }
      return res.send({ card });
    })
    .catch((err) => handleError(err, res));
};

const dislikeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'StatusCode: 404 - Карточка не найдена!' });
      }
      return res.send({ card });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
