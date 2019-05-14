const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'awtProjectSignup',
    password: 123,
    port: 5432,
})

const getProjects = (request, response) => {
    pool.query('SELECT * FROM projects ORDER BY "ProjectId" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProjectById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM projects WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createProject = (request, response) => {
    const { title, desc, categoryId, Prereq, MaxStudent } = request.body

    console.log(title)
    console.log(desc)
    console.log(categoryId)
    console.log(Prereq)
    console.log(MaxStudent)

    pool.query('INSERT INTO projects ("Title", "Description", "CategoryID", "Prereq", "MaxStudent") VALUES ($1, $2, $3, $4, $5) RETURNING "ProjectId"',
        [title, desc, categoryId, Prereq, MaxStudent], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Project added with ID: ${result.rows[0].ProjectId}`)
            //${result.rowCount} ${result.command}
        })
}


const updateProject = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, desc, categoryId, Prereq, MaxStudent } = request.body

    pool.query(
        'UPDATE projects SET "Title" = $1, "Description" = $2, "CategoryID" = $3, "Prereq" = $4, "MaxStudent" = $5 WHERE "ProjectId" = $6 RETURNING "ProjectId"',
        [title, desc, categoryId, Prereq, MaxStudent, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Project modified with ID: ${results.rows[0].ProjectId}`)
        }
    )
}


const deleteProject = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM projects WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
}