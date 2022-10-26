const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())
app.use(cors())

//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const category = require('./routes/categoryRoutes')

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', category);

module.exports = app;

//Middleware for error
const errorMiddleware = require('./middleware/error');

app.use(errorMiddleware);
