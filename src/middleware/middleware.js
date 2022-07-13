const jwt = require("jsonwebtoken")
const User = require("../model/user.model")
const responseGenerator = require("../utils/responseGenrate");

 
const auth = async(req,res,next)=>{
    try{
        
        const authHeader = req.headers['authorization']
         const token = authHeader && authHeader.split(" ")[1]
        const decoded = jwt.verify(token, 'this')
        if(token==null){
            return res.send(responseGenerator(true,"error in token",token))
        }
        const user = await User.findOne({_id:decoded._id})

        // console.log(user.permissions.blog[1]==1)
        if(!user){
            throw new Error()
        }
        req.user=user
        next()
    }catch(e){
      console.log(e)
        res.send(responseGenerator(true,"error",e.message))   
         
    }
}

module.exports=auth