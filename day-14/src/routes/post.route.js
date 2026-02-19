const express = require('express');
const postRouter=express.Router()
const postController=require("../controllers/post.controller")
const multer = require('multer');
const upload=multer({storage:multer.memoryStorage()})
//post  /api/posts [protected]
// req.body ={caption,image-file}
postRouter.post("/",upload.single("image"),postController.createPostController)
//get /api/posts/ [protected]

postRouter.get("/",postController.getPostController)

//get /api/posts/details/:postid
//return an detail about specific post with id also check wheter the post belongs to the user that is requesting

postRouter.get("/details/:postId",postController.getPostDetails)

module.exports=postRouter;
