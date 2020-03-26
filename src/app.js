'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

// database
mongoose.connect(
    'mongodb+srv://bonitao:entrelogo@cluster0-30dpf.mongodb.net/test?retryWrites=true&w=majority'
)

// models
const Product = require('./models/product')

// routes
const indexRoute = require('./routes/index')
const productRoute = require('./routes/product')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app