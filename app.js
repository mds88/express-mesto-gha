/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true }, (err) => {
  const message = err || 'mongdb is connected';
  console.log(message);
});

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use('/', (req, res) => res.status(404).send({ message: 'Такой страницы не существует' }));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
