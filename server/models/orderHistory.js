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


//private method to authenticate based on user type and company type
const authenticate = (request, response, query) => {

  if (request.userType == 2) {
    query += ' Where "CompanyId"=' + request.PersonRole;

  }
  else if (request.userType == 1) {
    query += ' Where "PersonID"=' + request.userId;
  }
  else {
    response.status(401).send("You cannnot perform this operation");
  }
  return query;
}

module.exports = {
  getOrdersHistory,
};
