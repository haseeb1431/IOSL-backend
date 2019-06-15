const { pool } = require('./db');

/**
 * Get all users from the system
 * @param {object} request Request object
 * @param {object} response response object
 */
const getPersons = (request, response) => {
  pool.query('SELECT * FROM "Person" ORDER BY "ID" ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Get users from the system using ID
 * @param {object} request Request object
 * @param {object} response response object
 */
const getPersonById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT * FROM "Person" WHERE "ID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Verify the user login information
 * @param {object} request Request object
 * @param {object} response response object
 */
const userLogin = (request, response) => {
  const { email, password } = request.body;

  pool.query('SELECT * FROM "Person" WHERE "Email" = $1 and "Password" = $2', 
  [email, password], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Get person infomration via Email
 * @param {object} request Request object
 * @param {object} response response object
 */
const getPersonByEmail = (request, response) => {
  
  pool.query('SELECT * FROM "Person" WHERE "Email" = $1', [request.params.email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


/**
 * Insert person into the database
 * @param {object} request Request object
 * @param {object} response response object
 */
const createPerson = (request, response) => {
  const {
    fullname, email, password, persontype,
  } = request.body;
  pool.query('INSERT INTO "Person" ("FullName", "Email", "Password", "PersonType") VALUES ($1, $2, $3, $4)',
    [fullname, email, password, persontype], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`${result.rowCount} User added `);
    });
};

/**
 * update person infomration in the database
 * @param {object} request Request object
 * @param {object} response response object
 */
const updatePerson = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { fullname, email, persontype } = request.body;

  pool.query(
    'UPDATE "Person" SET "FullName" = $1, "Email" = $2, "PersonType"=$3 WHERE "ID" = $4 ',
    [fullname, email, persontype, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Users updated: ${results.rowCount}`);
    },
  );
};


/**
 * Delete a person
 * @param {object} request Request object
 * @param {object} response response object
 */
const deletePerson = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM "Person" WHERE "ID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Person deleted with ID: ${results.rows[0].ProjectId}`);
  });
};


module.exports = {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  getPersonByEmail,
  userLogin
};
