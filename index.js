const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');

dbConnect();
app.use(bodyParser.json())
// app.use("/",(req,res)=>{
//     res.json({
//         message:"connected successfully",
//         success:false
//     })
// })

app.use("/api/user",authRouter)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})