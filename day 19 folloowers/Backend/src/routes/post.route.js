const express = require('express');
const postRouter=express.Router()
const postController=require("../controllers/post.controller")
const multer = require('multer');
const upload=multer({storage:multer.memoryStorage()})
const identifyUser=require("../middlewares/auth.middleware")
//post  /api/posts [protected]
// req.body ={caption,image-file}
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)
//get /api/posts/ [protected]

postRouter.get("/",identifyUser,postController.getPostController)

//get /api/posts/details/:postid
//return an detail about specific post with id also check wheter the post belongs to the user that is requesting

postRouter.get("/details/:postId",identifyUser,postController.getPostDetails)
//post/api/posts/likes/:postid
//like a post with the id provided in the request params
postRouter.post("/like/:postId",identifyUser,postController.likePostController)

//get/api/posts/feed
//get all post craerted in db
//acess private
postRouter.get("/feed",identifyUser,postController.getFeedController)

module.exports=postRouter;
