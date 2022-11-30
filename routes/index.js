const router = require('express').Router();
const { errors } = require('celebrate');
const routerUser = require('./users');
const routerCard = require('./cards');
const errorHandler = require('../middlewares/errorHandler');
const { messages } = require('../utils/constants');

router.use(routerUser);
router.use('/cards', routerCard);

router.use('/', (req, res) => res.status(404).send({ message: messages.pageNotFound }));

router.use(errors());
router.use(errorHandler);

module.exports = router;
