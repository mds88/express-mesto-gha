const jwt = require('jsonwebtoken');
const NotAuth = require('../errors/NotAuth');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new NotAuth('Необходима авторизация - Нет токена');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    next(new NotAuth('Необходима авторизация - Токен не верифицирован'));
  }

  req.user = payload;

  next();
};
