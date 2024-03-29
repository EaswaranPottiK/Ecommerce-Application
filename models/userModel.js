const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    mobile:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})

module.exports = mongoose.model("User",userSchema)