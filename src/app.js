const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controller/environment.controller')
const app = express();
const controller = new Controller()


app.use(bodyParser.json());

app.use('/environment', controller.route);

app.use(function (error, req, res, next){
    res.status(500).send(error.message);
})

module.exports = app

