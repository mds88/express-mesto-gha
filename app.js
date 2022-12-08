const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true }, (err) => {
  const message = err || 'mongdb is connected';
  console.log(message);
});

app.use(indexRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
