const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    //2000 followers
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"follower is required"]
    },
    //200 people i am following
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"followee is required"]
    }
},
{
    timestamps:true
})
const followModel=mongoose.model("follows",followSchema)
module.exports=followModel