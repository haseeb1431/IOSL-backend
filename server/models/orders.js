const pool = require('./db').pool


const getOrders = (request, response) => {
    pool.query('SELECT * FROM "Orders" ORDER BY "OrderID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getOrderById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Orders" WHERE "OrderID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createOrder = (request, response) => {
    const { pickaddressid, dropaddressid, pickdate, arrivaldate,personid } = request.body

    pool.query('INSERT INTO "Orders" ("PickAddressID", "DropAddressID", "PickDate", "ArrivalDate", "PersonID") VALUES ($1, $2, $3, $4, $5) RETURNING "OrderID"',
        [pickaddressid, dropaddressid, pickdate, arrivaldate, personid], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Order added with ID: ${result.rows[0].OrderID}`)            
        })
}


const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { pickaddressid, dropaddressid, pickdate, arrivaldate, personid } = request.body

    pool.query(
        'UPDATE "Orders" SET "PickAddressID" = $1, "DropAddressID" = $2, "PickDate" = $3, "ArrivalDate" = $4, "PersonID"=$5 WHERE "OrderID" = $6',
        [pickaddressid, dropaddressid, pickdate, arrivaldate, personid, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Order modified with ID: ${id}`)
        }
    )
}


const deleteOrder = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "Orders" WHERE "OrderID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Order deleted with ID: ${results.rows[0].OrderId}`)
    })
}

const getOrdersByUser = (request, response) => {
    const userId = parseInt(request.params.userid)

    pool.query('SELECT * FROM "Orders" inner join "Person" on "Orders"."PersonID" = "Person"."ID" where "Person"."ID"= $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUser
}