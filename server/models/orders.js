const { pool } = require('./db');

/**
 * Get /Packages
 * Select all packages for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrders = (request, response) => {
  pool.query('SELECT * FROM "Orders" inner join "Person" on "Person"."ID"="Orders"."ReceiverPersonID" ORDER BY "OrderID" Desc', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


/**
 * Get /Packagesdetails
 * Select all packages for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrdersDetails = (request, response) => {
  pool.query('SELECT * FROM "Orders" inner join "Address" on "Orders"."DropAddressID"="Address"."AddressID" ORDER BY "OrderID" ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Get /package/:id
 * Get package by ID
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrderById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT 	"Orders".*,	"addrop"."StreetAddress" as dropstreetAddress, 	"addrop"."City" as dropcity,'+
	'"addrop"."Country" as dropcountry, "addrop"."PostCode" as droppostcode, 	"adpick"."StreetAddress" as pickstreetAddress,'+
	'"adpick"."City" as pickcity,	"adpick"."Country" as pickcountry,	"adpick"."PostCode" as pickpostcode FROM "Orders" inner join "Address" addrop on "Orders"."DropAddressID"="addrop"."AddressID" '+
	'inner join "Address" adpick on "Orders"."PickAddressID"="adpick"."AddressID" WHERE "Orders"."OrderID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Get /userpackagetimeline/:pkgid
 * Get package timeline from the blockchain back-end
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */

 //TODO: hardcoded for dummy implementation
const getPackageTimeline = (request, response) => {
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
 * Post /package
 * Create new package
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
 * PUT /package/:id
 * update the existing package
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const updateOrder = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const {
    PickAddressID, DropAddressID, PickDate, ArrivalDate, PersonID, ReceiverPersonID, Status
  } = request.body;

  pool.query(
    'UPDATE "Orders" SET "PickAddressID" = $1, "DropAddressID" = $2, "PickDate" = $3, "ArrivalDate" = $4, "PersonID"=$5,'+
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
 * Delete /package/:id
 * update the existing package
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
 * GET /packages/user/:userid
 * GET all packages for a specific user
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrdersByUser = (request, response) => {
  const userId = parseInt(request.params.userid, 10);

  pool.query('SELECT 	"Orders".*, "Person".*,	"addrop"."StreetAddress" as dropstreetAddress, 	"addrop"."City" as dropcity,'+
	'"addrop"."Country" as dropcountry, "addrop"."PostCode" as droppostcode, 	"adpick"."StreetAddress" as pickstreetAddress,'+
	'"adpick"."City" as pickcity,	"adpick"."Country" as pickcountry,	"adpick"."PostCode" as pickpostcode FROM "Orders" inner join "Address" addrop on "Orders"."DropAddressID"="addrop"."AddressID" '+
  'inner join "Address" adpick on "Orders"."PickAddressID"="adpick"."AddressID" inner join "Person" on "Orders"."ReceiverPersonID" = "Person"."ID"'+
  'where "Orders"."PersonID"= $1', [userId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  getPackageTimeline,
  getOrdersDetails
};
