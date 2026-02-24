const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already exists"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:""

    },
    //2000 followers
//     followers:[{
//      type:mongoose.Schema.Types.ObjectId,
//      ref:"users",
//     }],
//     //200 people i am following
//     following:[{
//   type:mongoose.Schema.Types.ObjectId,
//      ref:"users",
//     }]
})
const userModel=mongoose.model("users",userSchema)

module.exports=userModel;