const express = require('express')
const cors = require('cors')
// const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
// const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConfig')
const corsOptions = require('./config/corsOptions')
const app = express()
const PORT = process.env.PORT || 3500
require('dotenv').config()

connectDB()
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/hospitals', require('./routes/api/hospital'))

mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})