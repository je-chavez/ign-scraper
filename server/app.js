const express = require('express'),
  app = express();
const mongoose = require('mongoose');
const PORT_NUMBER = 3000;
const scraper = require('./ign_scraper.js');

const config = require('../config');

mongoose.connect(
  config.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) console.log('There was an error connecting to mongo: ', err);
  }
);

app.listen(PORT_NUMBER, () =>
  console.log(`Scraper server started on port ${PORT_NUMBER}`)
);

//Starts scraper
scraper(); //Do initial run
setInterval(scraper, 900000); //Scrape every 15 minutes
