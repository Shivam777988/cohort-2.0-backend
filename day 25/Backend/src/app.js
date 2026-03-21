const express = require('express');
const authRoutes=require("./routes/auth.routes")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const songRoutes=require("./routes/song.routes")
const path = require("path")


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static("./public"))

app.use("/api/auth",authRoutes)
app.use("/api/songs",songRoutes)

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports=app;