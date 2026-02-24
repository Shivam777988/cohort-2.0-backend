const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    //2000 followers
    follower: {
      type:String
    },
    //200 people i am following
    followee: {
        type: String
    }
},
{
    timestamps:true
})
followSchema.index({follower:1,followee:1},{unique:true})
const followModel=mongoose.model("follows",followSchema)
module.exports=followModel