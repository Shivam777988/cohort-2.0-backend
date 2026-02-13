const express = require('express');
const authRouter=express.Router()
const userModel=require("../models/user.model")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//post /api/auth/register
authRouter.post("/register",async(req,res)=>{
    const{name,password,email}=req.body

    const isUserExists=await userModel.findOne({email})
    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const user=await userModel.create({
        name,email,password:crypto.createHash("sha256").update(password).digest("hex")

    })
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1h"})
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered succesfully",
        user
    })
})

authRouter.get("/get-me",async(req,res)=>{
const token=req.cookies.token

const decoded=jwt.verify(token,process.env.JWT_SECRET)
console.log(decoded);

const user=await userModel.findById(decoded.id)

res.json({
    name:user.name,
    email:user.email
})


})

module.exports=authRouter