const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    quantity:Number,
    images:{
        type:Array,
    },
    color:{
        type:String,
        enum:["Black","Brown","Red"]
    },
    ratings:[{
        star:Number,
        postedby:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
    }],

    sold:{
        type:Number,
        default:0
    }
},{timestamps:true})


module.exports = mongoose.model("Product",productSchema)