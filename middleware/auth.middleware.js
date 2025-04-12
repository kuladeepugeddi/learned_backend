const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log(token)

    if(token){
        try{
            const decoded = jwt.verify(token,"secret");
            if(decoded){
                // console.log(decoded)
                req.body = req.body || {}
                req.body.authorID = decoded.authorID;
                req.body.author = decoded.author;
                next();
            }
            else{
                res.send({message:"please login"});
            }
        }catch(error){
            res.send({error:error.message})
        }
    }
    else{
        res.send({message:"please login with token"})
    }
}

module.exports={auth}