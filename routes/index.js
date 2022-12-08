const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');

const routerUser = require('./users');
const routerCard = require('./cards');

const { messages, regexp } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexp.urlReg),
  }),
}), createUser);

router.use('/users', routerUser);
router.use('/cards', routerCard);

router.use('/', (req, res) => res.status(404).send({ message: messages.pageNotFound }));

module.exports = router;