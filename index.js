require('dotenv').config()
const express = require('express')
const dbStratiegy = require('./database/dbFactory')


const app = express()
// const { getDBConnectionInstance } = require('./db')
const Post = require('./models/post.model')
// getDBConnectionInstance().sync()


// new method to coonect to DB

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






