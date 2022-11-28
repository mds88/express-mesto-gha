require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const { messages } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true }, (err) => {
  const message = err || 'mongdb is connected';
  console.log(message);
});

app.use(routerUser);
app.use('/cards', routerCard);

app.use('/', (req, res) => res.status(404).send({ message: messages.pageNotFound }));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
