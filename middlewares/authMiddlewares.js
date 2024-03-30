const user = require('../models/userModel')
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                next();
            }
        }
        catch{
            throw new Error("Not authorised or token expired")
        }
    }
    else{
        throw new Error("There is no token attached to the header")
    }
})

const isAdmin = asyncHandler(async(req,res,next)=>{
    const email = req?.body?.email
    const adminUser = await user.findOne({email:email})
    if(adminUser.role ==='admin'){
        next();
    }
    else{
        throw new Error("only admins are allowed to use this functionality so please create a user with admin role")
    }
})


module.exports = {authMiddleware, isAdmin}