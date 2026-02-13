const mongoose =require('mongoose')

const connectToDB=()=>{
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database is connected");
    
})
}

module.exports=connectToDB;