const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Product = require('./models/product');

const indexRoute = require('./routes/indexRoute');
const productRoutes = require('./routes/productRoute');

const CONNECTION = 'mongodb+srv://bonitao:entrelogo@cluster0-30dpf.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(CONNECTION);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoutes);


module.exports = app;