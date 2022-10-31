// External imports
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const cookieParser = require('cookie-parser')

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler')
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
const inboxRouter = require('./router/inboxRouter')

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('Database Connection Successful!'))
    .catch(err => console.log(err))

// request parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set view engine
app.set("view engine", 'ejs')

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// parse cookies 
app.use(cookieParser(process.env.COOKIE_SECRET))

// route handling 
app.use('/', loginRouter)
app.use('/users', usersRouter)
app.use('/inbox', inboxRouter)

// 404 error handling
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
})