const express = require("express")
const songController = require("../controllers/song.controller")
const router = express.Router()
const upload=require("../middlewares/upload.middleware")


router.post("/",upload.single("song"),songController.uploadSong)
router.get("/",songController.getSong)

module.exports = router