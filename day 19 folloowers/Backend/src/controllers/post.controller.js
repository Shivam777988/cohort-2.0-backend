const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt=require("jsonwebtoken")
const postRouter = require("../routes/post.route")
const likeModel=require("../models/like.model")
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    // console.log(req.body, req.file)



    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "shivam ghibli",
        folder:"cohort-2-backend"
    })

    // res.send(file)

    const post=await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:req.user.id,
    })
res.status(201).json({
    message:"post created succesfully",post
})


}
async function getPostController(req,res){

// console.log(req.user);

 const userID=req.user.id
 console.log(userID);
 

 const posts=await postModel.find({
    user:userID
 })
 res.status(200).json({
    message:"post fetched succesfully",posts
 })
}
async function getPostDetails(req,res){
  
    const userId=req.user.id;
    console.log(userId);
    
    const postId=req.params.postId;

    const post= await postModel.findById(postId)
    console.log(post.user);
    

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isValidUser=post.user.toString()===userId;
    if(!isValidUser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }
    return res.status(200).json({
        message:"post fetched succefully",post
    })
}
async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}
async function getFeedController(req,res){

    const user=req.user
const posts=await Promise.all((await postModel.find().populate("user").lean())
.map(async(post)=>{

    //type of post=mongooseObject
    //so new property add ke liye lean lagao
    const isLiked=await likeModel.findOne({
        user:user.username,
   post:post._id
    }
    )
    post.isLiked=!!isLiked
    return post
}))

res.status(200).json({
    message:"post fetched succesfully",posts
})
}
module.exports = {
    createPostController,getPostController,getPostDetails,likePostController,getFeedController
}