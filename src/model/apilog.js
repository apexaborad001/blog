const mongoose=require("mongoose")
const APISchema=mongoose.Schema({
    APImethod:String,
    APIURL:String,
    DeviceType:String,
    requestBody:Object,
    responseBody:Object,
    time:String

})
module.exports=mongoose.model("api_logger",APISchema)