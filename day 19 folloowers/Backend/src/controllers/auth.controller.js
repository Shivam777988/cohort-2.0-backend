const express = require('express');
const userModel = require('../models/user.model');
const crypto=require("crypto")
const authRouter=express.Router()
const jwt=require("jsonwebtoken")

const bcrypt = require('bcryptjs');


async function registerController(req,res) {
    const{email,username,password,bio,profileImage}=req.body;
    // const isUserExistsByEmail=await userModel.findOne({email})
    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message:"user already exists with same email"
    //     })
    // }
    //  const isUserExistsByUserName=await userModel.findOne({username})
    // if(isUserExistsByUserName){
    //     return res.status(409).json({
    //         message:"user already exists with same username"
    //     })
    // }
    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
     if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists"+(isUserAlreadyExists.email==email?"email aready exists":"username already exists")
        })
    }
    // const hash=crypto.createHash("sha256").update(password).digest('hex')
   const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash,


    })
    //user ka data hona chahioye data unique hona chahiye
    const token=jwt.sign({
id:user._id,username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)
    res.status(201).json({
        message:"ussr registered",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage,
        }
    })
}


async function loginController (req,res) {
    const{username,email,password}=req.body;
    //username and password base login or email and password base login
    const user=await userModel.findOne({
       $or:[
        {
            //conditions
            username:username

        },{
           email:email
        }
       ] 
    })
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    // const hash=crypto.createHash("sha256").update(password).digest('hex')
    // const isPasswordValid=hash==user.password;
    const isPasswordValid= await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"passowrd invalid"
        })
    }
    const token=jwt.sign(
        {id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in succesfully",
        user:{
        email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage,

        }
    })}
  async function getMeController(req,res) {
    const userId=req.user.id
    const user=await userModel.findById(userId)

        res.status(201).json({
        
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage,
        }
    })
    
  }

module.exports={
    registerController,loginController,getMeController
}