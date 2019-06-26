
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
    app.put('/persons/:id', person.updatePerson);
    app.delete('/persons/:id', person.deletePerson);
    app.get('/persons/exists/:email', person.getPersonByEmail);
    app.post('/login', person.userLogin);

    app.get('/address', addressModel.getAddress);
    app.get('/address/:id', addressModel.getAddressById);
    app.post('/address', addressModel.createAddress);
    app.put('/address/:id', addressModel.updateAddress);
    app.delete('/address/:id', addressModel.deleteAddress);

    app.get('/packages', withAuth, ordersModel.getOrders);
    app.get('/packagesdetails', withAuth, ordersModel.getOrdersDetails);
    app.get('/packages/:id', ordersModel.getOrderById);
    app.post('/packages', ordersModel.createOrder); //update to make userid required
    app.put('/packages/:id', ordersModel.updateOrder);
    app.delete('/packages/:id', ordersModel.deleteOrder);
    app.get('/packages/user/:userid', ordersModel.getOrdersByUser);
    app.get('/packages/timeline/:packageid', ordersModel.getPackageTimeline);



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

    //TODO:
    //pkgHistory Table


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
                email: req.user.Email
            };

            next();
        }, generateToken, sendToken);


}