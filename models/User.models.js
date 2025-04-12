const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    email:String,
    password:String
},{
    versionKey:false
});

const userModel = mongoose.model("flmuser", userSchema);

module.exports ={userModel}