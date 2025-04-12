const express= require("express");
const {userModel} = require("../models/User.models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    const {name,age,email, password} = req.body;
    try{
        bcrypt.hash(password, 5, async function(err,hash){
            const user = new userModel({name,age,email, password:hash});
            await user.save();
            res.status(200).send({"message":"user has been created"})
        })
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error.message});
    }
});

userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        // console.log(user.id)
        if(user){
            bcrypt.compare(password,user.password, async function(err,result){
                if(result){
                    const token = jwt.sign({authorID:user.id,author:user.name},"secret");
                    res.status(200).send({msg:"login successfully", token:token})
                }
                else{
                    res.status(200).send({msg:"wrong credentials"})
                }
            })
        }else{
            res.status(200).send({msg:"wrong credentials and user not found"})
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({error: error.message})
    }
});

module.exports={userRouter}