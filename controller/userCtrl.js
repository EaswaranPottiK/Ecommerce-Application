const { default: mongoose } = require('mongoose');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email})

    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser)
    }
    else{
        throw new Error ('User Already Exist')
    }
})

const loginUserCtrl = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    // console.log(email,password)
    const findUser = await User.findOne({email});
    // console.log(findUser)
    if(findUser && await findUser.isPasswordMatched(password)){  //look here - result of schema parse . method
        // console.log("password matched")
        res.json(findUser)
    }
    else{
        throw new Error("Invalid Credentials")
    }
})

module.exports = {createUser,loginUserCtrl}