const { pool } = require('./db');

/**
 * Get /Order History
 * Select all packages for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrdersHistory = (request, response) => {
  
    var query = 'SELECT * FROM "OrderHistory" inner join "Orders" on "OrderHistory"."OrderId"="Orders"."OrderID" ';
    query = authenticate(request, response, query);

    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });  
};


/**
 * Get /Order History
 * Select all packages for the database
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const getOrdersHistoryById = (request, response) => {

  const id = parseInt(request.params.id, 10);

  var query = 'SELECT "OrderHistory".*, "Company".*, "Person"."FullName" FROM "OrderHistory" inner join "Orders" on "OrderHistory"."OrderId"="Orders"."OrderID" '+
  'inner join "Company" on "Orders"."CompanyId"="Company"."Id" left join "Person" on "Person"."ID" = "OrderHistory"."PostmanId"'+
    'Where "OrderID"=$1 ';
  //query = authenticate(request, response, query);

  pool.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



/**
 * Post /package History
 * Create new package history or handover
 * @param {obj} request request object from node framework
 * @param {obj} response response object * 
 */
const createOrderHistory = (request, response) => {
  if (request.userType == 2 || request.userType == 1) {
    const {
      orderId, postmanId, handoverDate, status
    } = request.body;

    pool.query('INSERT INTO "OrderHistory" ("OrderId", "PostmanId", "HandoverDate", "Status") VALUES ($1, $2, $3, $4) RETURNING *',
      [orderId, postmanId, handoverDate, status], (error, result) => {
        if (error) {
          throw error;
        }
        response.status(201).json(result.rows[0]);
      });
  }
  else {
    response.status(401).send("You cannnot perform this operation");
  }
};


//private method to authenticate based on user type and company type
const authenticate = (request, response, query) => {

  if (request.userType == 2) {
    query += ' Where "CompanyId"=' + request.PersonRole;

  }
  else if (request.userType == 3) {
    query += ' Where "PostmanId"=' + request.userId;
  }
  else {
    response.status(401).send("You cannnot perform this operation");
  }
  return query;
}

module.exports = {
  getOrdersHistory,
  createOrderHistory,
  getOrdersHistoryById
};
