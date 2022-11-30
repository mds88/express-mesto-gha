const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true }, (err) => {
  const message = err || 'mongdb is connected';
  console.log(message);
});

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
