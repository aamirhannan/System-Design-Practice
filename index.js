require('dotenv').config()
const express = require('express')
const app = express()

const DatabaseFactory = require('./database/dbFactory')
const TodoRepository = require('./repositories/todoRepository')
const TodoService = require('./services/todoService')
const TodoController = require('./controllers/todoController')
const todoRoutes = require('./routes/todoRoutes')

const dbType = process.env.DB_TYPE || 'POSTGRES' // or 'MONGO'
const dbConnection = DatabaseFactory.getDatabaseConnection(dbType)

const startServer = async () => {
    await dbConnection.connect()

    const todoRepository = new TodoRepository(dbConnection, dbType)
    const todoService = new TodoService(todoRepository)
    const todoController = new TodoController(todoService)

    app.use(express.json())
    app.use('/todos', todoRoutes(todoController))

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
}

startServer()






