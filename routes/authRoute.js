const express = require('express');
const createUser = require('../controller/userCtrl');
const router = express.Router();

// router.post("/register",createUser)

router.post("/register",(req,res)=>{
    res.json({
        message:"okay"
    })
})

module.exports = router