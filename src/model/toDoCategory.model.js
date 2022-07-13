const mongoose=require("mongoose")
const blogCategorySchema=mongoose.Schema({
   categoryName:String

})
module.exports=mongoose.model("to_do_category",blogCategorySchema)