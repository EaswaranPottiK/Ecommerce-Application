const User = require('../models/userModel')

const createUser = async(req,res)=>{
    const email = req.body.email;
    console.log(email)
    const findUser = await User.find({email:email})
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser)
    }
    else{
        res.json({
            message:"User already exist",
            success:false
        })
    }
}

module.exports = createUser