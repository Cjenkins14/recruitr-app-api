require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const schoolRouter = require('./Schools/school-router');
const playerRouter = require('./Player/player-router');
const { NODE_ENV } = require('./config');
const { CLIENT_ORIGIN } = require('./config');
const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({
    origin: CLIENT_ORIGIN
}));



app.use('/school', schoolRouter);
app.use('/player', playerRouter);

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
        console.log(error)
    } else {
        console.log(error)
        response = { error: { message: error.message } }
    }
    res.status(500).json(response)
});



module.exports = app;