const jwt = require('jsonwebtoken')

const generateRefreshToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'40d'})
}

module.exports = {generateRefreshToken}