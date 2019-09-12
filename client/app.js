const express = require('express'),
  app = express();
const mongoose = require('mongoose');
const PORT_NUMBER = 3001;
const config = require('../config');

mongoose.connect(
  config.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) console.log('There was an error connecting to mongo: ', err);
  }
);

const newsRoute = require('./routes/news');

app.listen(PORT_NUMBER, () =>
  console.log(`Scraper server started on port ${PORT_NUMBER}`)
);

app.use('/news', newsRoute());
