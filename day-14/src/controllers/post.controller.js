const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")
const postRouter = require("../routes/post.route")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    console.log(req.body, req.file)
const token=req.cookies.token
if(!token){
    return res.status(401).json({
        message:"token not provided unauthorized access"
    })
}
let decoded=null;


try{
     decoded=jwt.verify(token ,process.env.JWT_SECRET)
console.log(decoded);
}
catch(err){
    return res.status(401).json({
        message:"user not authorized"
    })
}


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "shivam ghibli",
        folder:"cohort-2-backend"
    })

    // res.send(file)

    const post=await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:decoded.id
    })
res.status(201).json({
    message:"post created succesfully",post
})


}
async function getPostController(req,res){
const token=req.cookies.token;
 if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
let decoded;
try{
 decoded=jwt.verify(token,process.env.JWT_SECRET)
}
catch(err){
    return res.status(401).json({
        message:"token invalid"

    })
   
}
 const userID=decoded.id;
 const posts=await postModel.find({
    user:userID
 })
 res.status(200).json({
    message:"post fetched succesfully",posts
 })
}
async function getPostDetails(req,res){
    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
    let decoded;
    try{
decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
    const userId=decoded.id;
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

module.exports = {
    createPostController,getPostController,getPostDetails
}