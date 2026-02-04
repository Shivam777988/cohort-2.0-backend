const express = require('express');

const noteModel=require("./models/note.model")
const cors = require('cors');
const app=express();
app.use(cors())
app.use(express.json());

//post  /api/notes
//create new note and save data in mongo db

app.post("/api/notes",async(req,res)=>{
    const {title,description}=req.body;
  const note= await noteModel.create({
        title,description
    })
    res.status(201).json({message:"note created succesfuly",note})
})

//get fetch from mongo db notes data

app.get("/api/notes",async(req,res)=>{
    const notes= await noteModel.find();
res.status(200).json({
    message:"notes fetched succesfuly",notes
})
})
//delete /api/notes/:id
//delete note witbn the id from req.params

app.delete("/api/notes/:id",async(req,res)=>{
const id=req.params.id;
console.log(id);
await noteModel.findByIdAndDelete(id)

res.status(200).json({
    message:"note deleted"
})


})
//patch /api/notes/:id
//update the description by id
//req.body={description}

app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
console.log("PATCH body:", req.body); // debug
const {description}=req.body
await noteModel.findByIdAndUpdate(id,{description })
res.status(200).json({
    message:"note updated succesfully"
})
})












module.exports=app;
