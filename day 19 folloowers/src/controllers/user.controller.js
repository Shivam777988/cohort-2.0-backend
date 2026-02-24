const followModel=require("../models/follow.model")

async function followUserController(req,res){
const followerUsername=req.user.username
const followeeUsername=req.params.username
if(followerUsername==followeeUsername){
return res.status(400).json({
    message:"you cannot follow yourself"
})
}
const isfolloweeExists=await followModel.findOne({
    username:followeeUsername
})
if(!isfolloweeExists){
    return res.status(404).json({
        message:"user you are trying to follow does not exist"
    })
}






const isAlreadyFollowiing=await followModel.findOne({
    follower:followerUsername,
       followee:followeeUsername
})
if(isAlreadyFollowiing){
    return res.status(200).json({
        message:`you are already following ${followeeUsername}`,
        follow:isAlreadyFollowiing
    })
}

const followRecord=await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
})
res.status(201).json({
    message:`you are now following ${followeeusername}`,
    follow:followRecord
})
}
async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports={
    followUserController,unfollowUserController
}