const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

const bookshop = require('./routes/bookshop');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    ' GET, POST, PUT, DELETE'
  );
  next();
});
app.use(bookshop);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://Boon:31278@cluster0.xd6tj.mongodb.net/Cluster0'
  ,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(result => {
    console.log('success')
    app.listen(3000);
    
  })
  .catch(err => {
    console.log(err);
  });
