const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
var auth = require('./routes/auth/auth')
var todo = require('./routes/todos/todos')
var user = require('./routes/user/user')
const bodyparser = require('body-parser')
const db = require('./config/db')

app.use(bodyparser.json())

app.use('/', auth)

app.use('/todo', todo)

app.use('/user', user)

app.listen(process.env.APP_PORT, function() {
    console.log("SERVER START ON PORT " + process.env.APP_PORT)
})