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
app.get('/persons/exists/:email', person.getPersonByEmail)





app.get('/address', addressModel.getAddress)
app.get('/address/:id', addressModel.getAddressById)
app.post('/address', addressModel.createAddress)
app.put('/address/:id', addressModel.updateAddress)
app.delete('/address/:id', addressModel.deleteAddress)

app.get('/packages', ordersModel.getOrders)
app.get('/packagesdetails', ordersModel.getOrdersDetails)
app.get('/packages/:id', ordersModel.getOrderById)
app.post('/packages', ordersModel.createOrder) //update to make userid required
app.put('/packages/:id', ordersModel.updateOrder)
app.delete('/packages/:id', ordersModel.deleteOrder)
app.get('/packages/user/:userid', ordersModel.getOrdersByUser)
app.get('/packages/timeline/:packageid', ordersModel.getPackageTimeline)



//pkgid, Receiverid, senderid, recvrcompanyid, sendcompanyid, location, date time, status
//app.post('/packageHandover',ordersModel.createOrderwithAddress)
//app.post('/completepackage',ordersModel.createOrderwithAddress)
//companypackages/compnayid
//postmanPackages/postman
//postmanHandOver

app.get('/incidents', models.incidentModel.getIncidents)
app.get('/incidents/:id', models.incidentModel.getIncidentById)
app.post('/incidents', models.incidentModel.createIncident)
app.put('/incidents/:id', models.incidentModel.updateIncident)
app.delete('/incidents/:id', models.incidentModel.deleteIncident);

//TODO:
//pkgHistory Table


//#endregion


// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;


