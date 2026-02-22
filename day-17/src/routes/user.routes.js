const express = require('express');
const userController=require("../controllers/user.controller")

const identifyUser=require('../middlewares/auth.middleware')
const userRouter=express.Router();



// post /api/users/follow/:userid
// @description follow a user
// @access Private
userRouter.post("/follow/:userid",identifyUser,userController.followUserController)
module.exports=userRouter;