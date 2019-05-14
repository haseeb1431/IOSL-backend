const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'awtProjectSignup',
    password: 123,
    port: 5432,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM "Users" ORDER BY "UserID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Users" WHERE "UserID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
    const { userid, email, password } = request.body

    pool.query('INSERT INTO "Users" ("UserID", "UserEmail", "UserPassword") VALUES ($1, $2, $3)',
        [userid, email, password], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} User added `)
        })
}


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { email, password } = request.body

    pool.query(
        'UPDATE "Users" SET "UserEmail" = $1, "UserPassword" = $2 WHERE "UserID" = $3 ',
        [email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM Users WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}