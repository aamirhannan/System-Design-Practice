require('dotenv').config()
const express = require('express')
const app = express()
// const { getDBConnectionInstance } = require('./db')
const Post = require('./models/post.model')
// getDBConnectionInstance().sync()


// new method to coonect to DB

const dbStratiegy = require('./datbase/dbFactory')
const dbConnection = dbStratiegy.getDatabaseConnection(process.env.DB_TYPE).connect()



const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoutes')



app.use(express.json())

app.use('/auth', authRoute)
app.use('/posts', postRoute)

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})






