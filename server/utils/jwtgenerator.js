const jwt=require("jsonwebtoken")
require("dotenv").config();

function jwtgenerator(id){
    const payload={
        user:id
    }
     return jwt.sign(payload,process.env.jwtsecret,{expiresIn:"5hr"})

}
module.exports=jwtgenerator