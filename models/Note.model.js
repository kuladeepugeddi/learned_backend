const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:String,
    body:String,
    author:String,
    category:String,
    authorID:{type:String,required:true}
},{
    versionKey:false
});

const notesModel = mongoose.model("note",notesSchema);

module.exports = {notesModel}