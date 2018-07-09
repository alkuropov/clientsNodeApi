const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const clientRoutes = require('./api/routes/clients');
const visitRoutes = require('./api/routes/visits');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://alkuropov:3edcxsw2@ds239029.mlab.com:39029/clientsnodeapi');

app.use(morgan('dev'));
// app.use(bodyParser({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-type, Accept, Authorization"
    // );
    // if (req.method === 'OPTIONS') {
    //     res.header("Access-Control-Allow-Metods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    //     return res.status(200).json({});
    // }
    // next();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

// Основные маршруты
app.use('/clients', clientRoutes);
app.use('/visits', visitRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
})

module.exports = app;