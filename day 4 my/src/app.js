const express = require('express');
const http = require('http');
const app=express();
app.use(express.json())
const notes=[];



app.post("/notes",(req,res)=>{
  console.log(req.body);
  res.send("data recievd")
  notes.push(req.body)
//   console.log(notes);
  
})

app.get("/notes",(req,res)=>{
    res.send(notes);
})
app.patch("/notes",(req,res)=>{
    console.log(req.body);
    notes[0].desc=req.body.desc
    res.send("patching righnt")
    console.log(notes);
    
})


app.delete("/notes",(req,res)=>{
    res.send("deleted")
    // delete notes[0];
    notes.filter((note,index)=>{
        index!==0;
    })
    console.log(notes);
    
})










module.exports=app;
