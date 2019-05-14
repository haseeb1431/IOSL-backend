const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const cors = require('cors')
require('dotenv').config()
// Set up the express app
const app = express();


const user = require('./server/models/users');



//#region App settings
// Log requests to the console.
app.use(logger('dev'));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#endregion

//#region Routing

app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.post('/users', user.createUser)
app.put('/users/:id', user.updateUser)
app.delete('/users/:id', user.deleteUser)

//#endregion


// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;


