const mongoose=require("mongoose")
const toDoListSchema=mongoose.Schema({
    taskTitle:String,
    taskDescription:String,
    startDate:{
        type:Date,
        required:true,
        // default:Date.now
    },
    dueDate:{
        type:Date,
        required:true,
        // default:Date.now
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"to_do_category"
    },
    createdByuser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_details"
    }
    

})
module.exports=mongoose.model("to_do_list",toDoListSchema)