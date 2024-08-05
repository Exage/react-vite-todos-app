require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./routes/user')
const todosRoutes = require('./routes/todos')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/todos', todosRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })