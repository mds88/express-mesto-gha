const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const { messages } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { cardId } = req.params;

  Card.findOne({ cardId })
    .orFail(new NotFoundError(`Карточка с id: ${cardId} не найдена!`))
    .then((card) => {
      if (card.owner.toString() === ownerId) {
        card.delete()
          .then(() => res.status(200).send({ message: messages.cardDeleted }));
      } else {
        throw new ForbiddenError({ message: 'Нельзя удалить чужую карточку' });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id: ${cardId} не найдена!`))
    .then((card) => res.send({ card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id: ${cardId} не найдена!`))
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
