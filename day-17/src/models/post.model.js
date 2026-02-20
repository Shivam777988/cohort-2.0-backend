const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"imgURl is required for creating an post"]
    },
    user:{
   ref:"users",
   type:mongoose.Schema.Types.ObjectId,
   required:[true,"user id is req for creating the post"]
    }
})
const postModel=mongoose.model("posts",postSchema)

module.exports=postModel;