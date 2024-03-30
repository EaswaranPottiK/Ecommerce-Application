const { default: mongoose } = require('mongoose');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')


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
        res.json({
            _id:findUser._id,
            firstname:findUser.firstname,
            lastname:findUser.lastname,
            email:findUser.email,
            mobile:findUser.mobile,
            role:findUser.role,
            token:generateToken(findUser._id)
        })
    }
    else{
        throw new Error("Invalid Credentials")
    }
})


const getAllUsers = asyncHandler(async(req,res)=>{
    try{
        const getUser = await userModel.find()
        res.json(getUser)
    }
    catch(error){
        throw new Error(error)
    }
})

const getAUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    try{
        const email = req.body.email
        const salt = bcrypt.genSaltSync(5)
        const newPassword = bcrypt.hashSync(req.body.newPassword,salt) 
        
        console.log(email, newPassword)
        await userModel.findOneAndUpdate({email:email},{password:newPassword})
        res.json("Response: User password updated successfully")
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteAUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    try{
        const user = await userModel.deleteOne({_id:id})
        res.json(user)
    }
    catch(error){
        throw new Error(error)
    }
})

module.exports = {createUser, loginUserCtrl, getAllUsers, getAUser, deleteAUser}