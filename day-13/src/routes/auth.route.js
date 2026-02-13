const express = require('express');
const userModel=require("../models/user.model")
const authRouter=express.Router()

const jwt=require("jsonwebtoken")
const crypto = require('crypto');
// /api/auth/register
authRouter.post("/register",async(req,res)=>{
    const{email,name,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user with this email already exists"
        })
    }
    const hash=crypto.createHash("md5").update(password).digest("hex")
  const user=await userModel.create({
        email,password:hash,name
    })
    const token=jwt.sign({
        id:user._id,
        email:user.email,
    },
       process.env.JWT_SECRET
)
res.cookie("jwt_token",token)
    res.status(201).json({
    message:"user registered",user,token
})
})
// /api/auth/login
//controller all fn execiute when an requsst comes on api
authRouter.post("/login",async (req,res) => {
    const{email,password}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user not found with this email"
        })
    }
    const isPasswordMatched=user.password===crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
res.cookie("jwt_token",token)
console.log(req.cookies);

res.status(200).json({
    message:"user logged in",user
})


})








authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);
  res.status(200).json({
        mesaage:"this is a protected route"
    })
})


module.exports=authRouter