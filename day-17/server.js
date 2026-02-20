require("dotenv").config()


const app = require('./src/app');
const connectTODB=require("./src/config/database")


connectTODB();
app.listen(3000,()=>{
    console.log("server is runnig at port 3000");
    
})