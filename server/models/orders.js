const { pool } = require('./db');


const getOrders = (request, response) => {
  pool.query('SELECT * FROM "Orders" ORDER BY "OrderID" ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getOrdersDetails = (request, response) => {
  pool.query('SELECT * FROM "Orders" inner join "Address" on "Orders"."DropAddressID"="Address"."AddressID" ORDER BY "OrderID" ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
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

const createOrderwithAddress = (request, response) => {

};


const updateOrder = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const {
    pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status
  } = request.body;

  pool.query(
    'UPDATE "Orders" SET "PickAddressID" = $1, "DropAddressID" = $2, "PickDate" = $3, "ArrivalDate" = $4, "PersonID"=$5'+
    ' ReceiverPersonID=$6, "Status"=$7 WHERE "OrderID" = $8',
    [pickaddressid, dropaddressid, pickdate, arrivaldate, personid, receieverid, status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200);
    },
  );
};


const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM "Orders" WHERE "OrderID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Order deleted with ID: ${results.rows[0].OrderId}`);
  });
};

const getOrdersByUser = (request, response) => {
  const userId = parseInt(request.params.userid, 10);

  pool.query('SELECT * FROM "Orders" inner join "Person" on "Orders"."PersonID" = "Person"."ID" where "Person"."ID"= $1', [userId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

function insertAddress(addressObj) {
  pool.query('INSERT INTO "Address" ("StreetAddress", "City", "Country", "PostCode") VALUES ($1, $2, $3, $4) RETURNING "AddressID"',
    [addressObj.street, addressObj.city, addressObj.country, addressObj.postcode],
    (error, result) => {
      if (error) {
        throw error;
      }
      // console.log(result.rows[0].AddressID);
      return result.rows[0].AddressID;
    });
}


module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  createOrderwithAddress,
  getPackageTimeline,
  getOrdersDetails
};
