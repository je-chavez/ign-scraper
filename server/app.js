const express = require('express'),
app = express();
const mongoose = require('mongoose');
const PORT_NUMBER = 3000;
const scraper = require('./ign_scraper.js');

app.listen(PORT_NUMBER, () => console.log(`Scraper server started on port ${PORT_NUMBER}`));

//Starts scraper
scraper();