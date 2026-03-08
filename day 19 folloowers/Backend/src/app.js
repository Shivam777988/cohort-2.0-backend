const express =require('express')
const cookieParser=require("cookie-parser")
const cors=require("cors")
const app=express();
const path = require("path")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use(express.static("./public"))

const authRouter=require("./routes/auth.route")
const postRouter=require("./routes/post.route")
const userRouter=require("./routes/user.routes")

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports=app;