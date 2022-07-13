const mongoose= require("mongoose")
const blogSchema = mongoose.Schema({
    blogName:String,
    blogDescription:String,
    createdByuser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_details"
    },
    updatedBy:{
        type:mongoose.Schema.Types.Object,
        ref:"user_details"
    },
    createdDate:{
        type:Date,
    
    },
    updatedDate:{
        type:Date
    },
    // from_date:String,
    // to_date:String
})

module.exports=mongoose.model("blog_description",blogSchema)