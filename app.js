/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true }, (err) => {
  const message = err || 'mongdb is connected';
  console.log(message);
});

app.use((req, res, next) => {
  req.user = {
    _id: '62e2046d251228f24d3595fd',
  };

  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use('/', (req, res) => res.status(404).send({ message: 'Такой страницы не существует' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
