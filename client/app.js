const express = require('express'),
app = express();
const mongoose = require('mongoose');
const PORT_NUMBER = 3001;

app.listen(PORT_NUMBER, () => console.log(`Scraper server started on port ${PORT_NUMBER}`));
