const mongoose = require('mongoose');


const connectTODB=async() => {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("conncetd to db");
    
}
module.exports=connectTODB;