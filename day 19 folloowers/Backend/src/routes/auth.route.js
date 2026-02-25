const express = require('express');
const userModel = require('../models/user.model');
const crypto=require("crypto")
const authRouter=express.Router()
const jwt=require("jsonwebtoken")
const authController=require("../controllers/auth.controller")
const identifyUser=require("../middlewares/auth.middleware")
authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController
)
// /api/auth/get-me
//get the currently logged user information
authRouter.get("/get-me",identifyUser,authController.getMeController)
module.exports=authRouter;
