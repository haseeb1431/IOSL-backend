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

    pool.query('SELECT * FROM "Orders" WHERE "OrderId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createOrder = (request, response) => {
    const { pickaddressid, dropaddressid, pickdate, arrivaldate } = request.body

    pool.query('INSERT INTO "Orders" ("PickAddressID", "DropAddressID", "PickDate", "ArrivalDate") VALUES ($1, $2, $3, $4) RETURNING "OrderID"',
        [pickaddressid, dropaddressid, pickdate, arrivaldate], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Order added with ID: ${result.rows[0].OrderID}`)            
        })
}


const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { pickaddressid, dropaddressid, pickdate, arrivaldate } = request.body

    pool.query(
        'UPDATE "Orders" SET "PickAddressID" = $1, "DropAddressID" = $2, "PickDate" = $3, "ArrivalDate" = $4 WHERE "OrderID" = $5',
        [pickaddressid, dropaddressid, pickdate, arrivaldate, id],
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


module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
}