const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app  = express()

const errorMiddleware = require('./middleware/error');

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));

const userRoute = require('./routes/userRoutes')
const serviceRoute = require('./routes/servicesRoute')
const bookingRoute = require('./routes/bookingRoute')
const conversationRoute = require('./routes/conversationRoute')
const messageRoute = require('./routes/messageRoute')
const reviewRoute = require('./routes/reviewRoute')

app.use('/api/v1/user',userRoute)
app.use('/api/v1/services',serviceRoute)
// app.use('api/v1/bookings',bookingRoute)
// app.use('api/v1/messageRoute',messageRoute)
// app.use('api/v1/conversations',conversationRoute)
// app.use('/api/v1/reviews',reviewRoute)


app.use(errorMiddleware)

module.exports =app;
