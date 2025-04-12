const express = require("express");
const {notesModel} = require("../models/Note.model");
const { auth } = require("../middleware/auth.middleware");

const notesRouter = express.Router();

notesRouter.post("/create", async(req,res)=>{
    try{
        const notes = new notesModel(req.body);
        await notes.save();
        res.status(200).send({message:"new note has been added"})
    }catch(error){
        console.log(error);
        res.status(400).send({error:error.message})
    }
})

notesRouter.get("/", async(req,res)=>{
    // console.log(req.body)
    try{    
        const notes = await notesModel.find({authorID:req.body.authorID});
        res.status(200).send(notes);
    }
    catch(error){
        console.log(error);
        res.status(400).send({message:error.message})
    }
})

notesRouter.patch("/update/:noteID", async(req,res)=>{
    const {noteID} = req.params;
    // console.log(noteID)
    const payload = req.body;

    const note = await notesModel.findOne({_id:noteID});
    const userID = req.body.authorID;

    try{
        if(note.authorID !== userID){
            res.send({message:"your are not authorized"})
        }
        else{
            await notesModel.findByIdAndUpdate({_id:noteID},payload);
            res.status(200).send({message:`the note with Id ${noteID} has been updated`})
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({message:message.error})
    }
})

notesRouter.delete("/delete/:noteId", async(req,res)=>{
    const {noteId} = req.params;

    const note = await notesModel.findOne({_id:noteId});
    const userID = req.body.authorID;
    try{
        if(note.authorID !== userID){
            res.send({message:"Your are not authorized"})
        }
        else{
            await notesModel.findByIdAndDelete({_id:noteId});
            res.status(200).send({message:`the note with id ${noteId} has been deleted`})
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({message:message.error})
    }

});


module.exports= {notesRouter}