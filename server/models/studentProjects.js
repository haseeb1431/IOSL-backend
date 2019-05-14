const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'awtProjectSignup',
    password: 123,
    port: 5432,
})


const getStudentProject = (request, response) => {
    pool.query('SELECT * FROM "StudentProject" ORDER BY "StudentID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentProjectByProject = (request, response) => {
    pool.query('SELECT * FROM "StudentProject" ORDER BY "ProjectID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentProjectById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "StudentProject" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createStudentProject = (request, response) => {
    const { studentid, projectid, preference } = request.body

    pool.query('INSERT INTO "StudentProject" ("StudentID", "ProjectID", "Preference") VALUES ($1, $2, $3)',
        [studentid, projectid, preference], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} Student Project added `)
        })
}


const updateStudentProject = (request, response) => {
    const id = parseInt(request.params.id)
    const {  studentid, projectid, preference } = request.body

    pool.query(
        'UPDATE "StudentProject" SET "StudentID" = $1, "ProjectID" = $2, "Preference"= $3 WHERE "ID" = $4 ',
        [ studentid, projectid, preference, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deleteStudentProject = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "StudentProject" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getStudentProject,
    getStudentProjectByProject,
    getStudentProjectById,
    createStudentProject,
    updateStudentProject,
    deleteStudentProject
}