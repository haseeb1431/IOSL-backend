const { pool } = require('./db');

/**
 * Get /OrderSensors
 * Select all OrderSensorss for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrderSensors = (request, response) => {

    pool.query('SELECT * FROM "OrderSensors" ORDER BY "Id" Desc', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  
};


/**
 * Get /OrderSensorsdetails
 * Select all OrderSensorss for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrderSensorDetails = (request, response) => {
  if (request.userId) {
    pool.query('SELECT * FROM "OrderSensors" inner Join "Orders" on "Orders"."OrderID"="OrderSensors"."Id"' +
      +'inner join "Person" on "Person"."ID"="Orders"."PersonID" where "Person"."PersonID"=$1',[request.userId], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
  }
  else {
    response.status(401);
  }
};

/**
 * Get /OrderSensors/:id
 * Get OrderSensors by ID
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrderSensorsById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT 	"Orders".*,	"addrop"."StreetAddress" as dropstreetAddress, 	"addrop"."City" as dropcity,' +
    '"addrop"."Country" as dropcountry, "addrop"."PostCode" as droppostcode, 	"adpick"."StreetAddress" as pickstreetAddress,' +
    '"adpick"."City" as pickcity,	"adpick"."Country" as pickcountry,	"adpick"."PostCode" as pickpostcode FROM "Orders" inner join "Address" addrop on "Orders"."DropAddressID"="addrop"."AddressID" ' +
    'inner join "Address" adpick on "Orders"."PickAddressID"="adpick"."AddressID" WHERE "Orders"."OrderID" = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};

/**
 * Get /userOrderSensorstimeline/:pkgid
 * Get OrderSensors timeline from the blockchain back-end
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */

//TODO: hardcoded for dummy implementation
const getOrderSensorsTimeline = (request, response) => {
  // const id = parseInt(request.params.pkgid);

  const results = [{
    // give sorted data; fake it for now, date, time, location, company, postman, status
    date: '2018-05-01',
    location: 'Berlin',
    company: 'DHL',
    postman: 'ps1',
    status: 'Registered',
  },
  {
    // give sorted data; fake it for now, date, time, location, company, postman, status
    date: '2018-05-03',
    location: 'Hamburg',
    company: 'DHL',
    postman: 'ps2',
    status: 'Dispatched',
  },
  ];
  response.status(200).json(results);
};


/**
 * Post /OrderSensors
 * Create new OrderSensors
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const createOrder = (request, response) => {
  const {
    pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status
  } = request.body;

  pool.query('INSERT INTO "Orders" ("PickAddressID", "DropAddressID", "PickDate", "ArrivalDate", "PersonID","ReceiverPersonID", "Status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).json(result.rows[0]);
    });
};

/**
 * PUT /OrderSensors/:id
 * update the existing OrderSensors
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const updateOrder = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const {
    PickAddressID, DropAddressID, PickDate, ArrivalDate, PersonID, ReceiverPersonID, Status
  } = request.body;

  pool.query(
    'UPDATE "Orders" SET "PickAddressID" = $1, "DropAddressID" = $2, "PickDate" = $3, "ArrivalDate" = $4, "PersonID"=$5,' +
    ' "ReceiverPersonID"=$6, "Status"=$7 WHERE "OrderID" = $8',
    [PickAddressID, DropAddressID, PickDate, ArrivalDate, PersonID, ReceiverPersonID, Status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.sendStatus(200);
    },
  );
};

/**
 * Delete /OrderSensors/:id
 * update the existing OrderSensors
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM "Orders" WHERE "OrderID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.sendStatus(200);
  });
};


/**
 * GET /OrderSensorss/user/:userid
 * GET all OrderSensorss for a specific user
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrdersByUser = (request, response) => {
  const userId = parseInt(request.params.userid, 10);

  pool.query('SELECT 	"Orders".*, "Person".*,	"addrop"."StreetAddress" as dropstreetAddress, 	"addrop"."City" as dropcity,' +
    '"addrop"."Country" as dropcountry, "addrop"."PostCode" as droppostcode, 	"adpick"."StreetAddress" as pickstreetAddress,' +
    '"adpick"."City" as pickcity,	"adpick"."Country" as pickcountry,	"adpick"."PostCode" as pickpostcode FROM "Orders" inner join "Address" addrop on "Orders"."DropAddressID"="addrop"."AddressID" ' +
    'inner join "Address" adpick on "Orders"."PickAddressID"="adpick"."AddressID" inner join "Person" on "Orders"."ReceiverPersonID" = "Person"."ID"' +
    'where "Orders"."PersonID"= $1', [userId], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};

module.exports = {
  getOrderSensors,
  getOrderSensorsById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  getOrderSensorsTimeline,
  getOrderSensorDetails
};
