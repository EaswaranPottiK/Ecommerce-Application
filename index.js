const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser')

dbConnect();
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/user",authRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})