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
    role:{
        type:String,
        default:'user'
    },
    cart:{
        type:Array,
        default:[]
    },
    address:[{type:mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref: "Product"}],
},{timestamps:true})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User",userSchema)