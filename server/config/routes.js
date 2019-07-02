
const models = require('../models/index');
const person = models.personsModel;
const addressModel = models.addressModel;
const ordersModel = models.ordersModel;

const { generateToken, sendToken } = require('./token.utils');
const withAuth = require('../lib/secureMiddleware')

module.exports = function (app, passport) {

    app.get('/persons', person.getPersons);
    app.get('/persons/:id', person.getPersonById);
    app.post('/persons', person.createPerson);
    app.post('/persons/userType', withAuth, person.updateUserType);
    app.put('/persons/:id', person.updatePerson);
    app.delete('/persons/:id', person.deletePerson);
    app.get('/persons/exists/:email', person.getPersonByEmail);
    app.post('/login', person.userLogin);

    app.get('/address', addressModel.getAddress);
    app.get('/address/:id', addressModel.getAddressById);
    app.post('/address', addressModel.createAddress);
    app.put('/address/:id', addressModel.updateAddress);
    app.delete('/address/:id', addressModel.deleteAddress);

    app.get('/sensors', models.sensorModel.getSensor);
    app.get('/sensors/:id', models.sensorModel.getSensorById);
    app.post('/sensors', models.sensorModel.createSensor);
    app.put('/sensors/:id', models.sensorModel.updateSensor);
    app.delete('/sensors/:id', models.sensorModel.deleteSensor);

    //rotues for the company model to do the crud operations
    app.get('/company', models.companyModel.getCompany);
    app.get('/company/:id', models.companyModel.getCompanyById);
    app.post('/company', withAuth, models.companyModel.createCompany);
    app.delete('/company/:id', models.companyModel.deleteCompany);

    //Order Sensor routes mapped to their method definations
    app.get('/OrderSensors', models.OrderSensorsModel.getOrderSensors);
    app.get('/OrderSensorsDetails', withAuth, models.OrderSensorsModel.getOrderSensorDetails);
    app.get('/OrderSensors/:id', withAuth, models.OrderSensorsModel.getOrderSensorsById);
    app.post('/OrderSensors', withAuth, models.OrderSensorsModel.createOrderSensors);

    app.get('/packages', withAuth, ordersModel.getOrders);
    app.get('/packagesdetails', withAuth, ordersModel.getOrdersDetails);
    app.get('/packages/:id', withAuth, ordersModel.getOrderById);
    app.post('/packages', withAuth, ordersModel.createOrder); //update to make userid required
    app.put('/packages/:id', withAuth, ordersModel.updateOrder);
    app.delete('/packages/:id', withAuth, ordersModel.deleteOrder);
    app.get('/packages/user/:userid', withAuth, ordersModel.getOrdersByUser);
    app.get('/packages/timeline/:packageid', withAuth, ordersModel.getPackageTimeline);

    //pkgid, Receiverid, senderid, recvrcompanyid, sendcompanyid, location, date time, status
    //app.post('/packageHandover',ordersModel.createOrderwithAddress)
    //app.post('/completepackage',ordersModel.createOrderwithAddress)
    //companypackages/compnayid
    //postmanPackages/postman
    //postmanHandOver

    app.get('/incidents', models.incidentModel.getIncidents);
    app.get('/incidents/:id', models.incidentModel.getIncidentById);
    app.post('/incidents', models.incidentModel.createIncident);
    app.put('/incidents/:id', models.incidentModel.updateIncident);
    app.delete('/incidents/:id', models.incidentModel.deleteIncident);

    app.get('/orderHistory', withAuth, models.orderHistoryModel.getOrdersHistory);


    app.post('/auth/google',
        passport.authenticate('google-token', { session: false }),
        function (req, res, next) {

            if (!req.user) {
                return res.send(500, 'User Not Authenticated');
            }
            req.auth = {
                id: req.user.ID,
                type: req.user.PersonType,
                name: req.user.FullName,
                email: req.user.Email,
                PersonRole: req.user.PersonRole
            };

            next();
        }, generateToken, sendToken);
}