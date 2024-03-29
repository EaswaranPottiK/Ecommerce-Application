const { default: mongoose } = require("mongoose")

const dbConnect = () =>{
    try{
        const conn = mongoose.connect(process.env.mongoDbUrl)
        console.log('Connection to mongo db is successful')
    }
    catch(error){
        console.log('Mongo db connection failed')
    }
}

module.exports = dbConnect