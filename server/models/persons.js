const pool = require('./db').pool


const getPersons = (request, response) => {
    pool.query('SELECT * FROM "Person" ORDER BY "ID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Person" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createPerson = (request, response) => {
    const { fullname, email, password, persontype } = request.body
    pool.query('INSERT INTO "Person" ("FullName", "Email", "Password", "PersonType") VALUES ($1, $2, $3, $4)',
        [fullname, email, password, persontype], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} User added `)
        })
}


const updatePerson = (request, response) => {
    const id = parseInt(request.params.id)
    const { personid, fullname, email, password, persontype } = request.body

    pool.query(
        'UPDATE "Person" SET "FullName" = $1, "Email" = $2, "PersonType"=$3 WHERE "ID" = $4 ',
        [fullname, email, persontype, personid ],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deletePerson = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "Person" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Person deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
}