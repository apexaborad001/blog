const mongoose= require("mongoose")
const userSchema = mongoose.Schema({
    userName:String,
    email :String,
    role:String,
    password:String,
    permissions:Object
    
})

userSchema.methods.generateAuthToken=async function(){
    const User =this
    const token =jwt.sign({_id:User._id},"this")
    // User.tokens =User.tokens.concat({token})
    await User.save()
    return token
}
module.exports=mongoose.model("user_details",userSchema)