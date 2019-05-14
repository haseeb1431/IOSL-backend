const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'awtProjectSignup',
    password: 123,
    port: 5432,
})


const getStudents = (request, response) => {
    pool.query('SELECT * FROM "Students" ORDER BY "StudentID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Students" WHERE "StudentID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createStudent = (request, response) => {
    const { studentid, name, email } = request.body

    pool.query('INSERT INTO "Students" ("StudentID", "StudentName", "StudentEmail") VALUES ($1, $2, $3)',
        [studentid, name, email], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} User added `)
        })
}


const updateStudent = (request, response) => {
    const id = parseInt(request.params.id)
    const { studentid, name, email } = request.body

    pool.query(
        'UPDATE "Students" SET "StudentName" = $1, "StudentEmail" = $2 WHERE "StudentID" = $3 ',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "Students" WHERE "StudentID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
}