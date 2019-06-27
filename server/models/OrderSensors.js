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
      +'inner join "Person" on "Person"."ID"="Orders"."PersonID" where "Person"."PersonID"=$1', [request.userId], (error, results) => {
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

  if (request.userId) {
    pool.query('SELECT * FROM "OrderSensors" inner Join "Orders" on "Orders"."OrderID"="OrderSensors"."Id"' +
      +'inner join "Person" on "Person"."ID"="Orders"."PersonID" where "Person"."PersonID"=$1 and "Id"=$2', [request.userId, id], (error, results) => {
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
 * Post /OrderSensors
 * Create new OrderSensors
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const createOrderSensors = (request, response) => {
  const {
    pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status
  } = request.body;

  pool.query('INSERT INTO "OrderSensors" ("PickAddressID", "DropAddressID", "PickDate", "ArrivalDate", "PersonID","ReceiverPersonID", "Status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).json(result.rows[0]);
    });
};


/**
 * Delete /OrderSensors/:id
 * update the existing OrderSensors
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const deleteOrderSensors = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM "OrderSensors" WHERE "Id" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.sendStatus(200);
  });
};

module.exports = {
  getOrderSensors,
  getOrderSensorsById,
  getOrderSensorDetails,
  createOrderSensors,
  deleteOrderSensors
};
