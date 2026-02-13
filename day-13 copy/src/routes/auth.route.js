const express = require('express');
const userModel=require("../models/user.model")
const authRouter=express.Router();

const jwt=require("jsonwebtoken")
authRouter.post("/register",async (req,res) => {
    const{email,name,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user with this email exists already"
        })
    }
    const user= await userModel.create({
        email,name, password
    })
    const token=jwt.sign({
        id:user._id,
    } ,   process.env.JWT_SECRET
)
res.cookie("jwt_token",token)
    res.status(201).json({
    message:"user registered",user,token
})
})
