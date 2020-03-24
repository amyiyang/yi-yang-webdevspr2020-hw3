const express = require('express');
const toReadBooks = require('./toReadBooks.js');
const haveReadBook = require('./haveReadBooks');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes
// app.use('/api/food', food);

app.use('/api/toReadBook', toReadBooks);
app.use('/api/haveReadBook', haveReadBook)

app.listen(3001, function() {
    console.log('Starting server');
});