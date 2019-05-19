const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const cors = require('cors')
require('dotenv').config()
// Set up the express app
const app = express();






//#region App settings
// Log requests to the console.
app.use(logger('dev'));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#endregion

//#region Routing

const models = require('./server/models/index');
const person = models.personsModel
const addressModel = models.addressModel
const ordersModel = models.ordersModel

app.get('/persons', person.getPersons)
app.get('/persons/:id', person.getPersonById)
app.post('/persons', person.createPerson)
app.put('/persons/:id', person.updatePerson)
app.delete('/persons/:id', person.deletePerson)

app.get('/address', addressModel.getAddress)
app.get('/address/:id', addressModel.getAddressById)
app.post('/address', addressModel.createAddress)
app.put('/address/:id', addressModel.updateAddress)
app.delete('/address/:id', addressModel.deleteAddress)

app.get('/orders', ordersModel.getOrders)
app.get('/orders/:id', ordersModel.getOrderById)
app.post('/orders', ordersModel.createOrder)
app.put('/orders/:id', ordersModel.updateOrder)
app.delete('/orders/:id', ordersModel.deleteOrder)
//#endregion


// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;


