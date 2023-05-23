const express = require('express')
const cookieParser = require('cookie-parser');
import cors from "cors";

const app  = express()

const errorMiddleware = require('./middleware/error');

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         msg:'hello'
//     })
// })
const user = require('./routes/userRoutes')

app.use('/api/v1',user)

app.use(errorMiddleware)

module.exports =app;
