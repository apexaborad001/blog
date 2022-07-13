
'use strict'
module.exports=(req)=>{
    req.BASE_URL=`${req.protocol}://${req.hostname}`
    let constants={
        "HTTP_SUCCESSS":200,//Successs
        "HTTP_BAD_REQUEST":400,//bad request
        "HTTP_FORBIDDEN":403,//unathorized acess or no permission
        "HTTP_NOT_FOUND":404,//not found
        "HTTP_NOT_EXIST":401//NOT EXIST
        ,
        "is_debug":1,
        "DEBUG_TYPE":"database"
    }
    
    let message={
        "SIGNIN":{
            "SUCCESS":"User SignIn successfully",
            "NOT_FOUND":"Invalid Email and Password",
            "ERROR":"Errror in SignIn User"
    
        },
        "SIGNUP":{
            "SUCCESS":"User SignUp successfully",
            "NOT_FOUND":"Error in SignUp"
        },
        "UPDATE_USER_DETAILS":{
            "SUCCESS":"User Updated successfully",
            "ERROR":"Error in Updating User"
        },
        "DELETE_USER":{
            "SUCCESS":"Deleted User successfully",
            "ERROR":"Error in Deleting User"
        },
        "CREATE_BLOG":{
            "SUCCESS":"Blog created successfully",
            "NOT_PERMITED":"This user do not have permission to create a blog",
            "ERROR":"Error in creating Blog"
        },
        "UPDATE_BLOG":{
            "SUCCESS":"Blog updated successfully",
            "NOT_PERMITED":"This user do not have permission to update a blog",
            "ERROR":"Error in updating Blog"
        },
        "VIEW_BLOG":{
            "SUCCESS":"Blog viewed successfully",
            "NOT_PERMITED":"This user do not have permission to view a blog",
            "ERROR":"Error in viewed Blog"
        },
        "DELETE_BLOG":{
            "SUCCESS":"Blog deleted successfully",
            "NOT_PERMITED":"This user do not have permission to delete a blog",
            "ERROR":"Error in deleting Blog"
        },
        "CREATE_TO_DO_LIST":{
            "SUCCESS":"TO DO LIST created successfully",
            "NOT_PERMITED":"This user do not have permission to create a TO DO LIST",
            "ERROR":"Error in creating TO DO LIST",
            "NOT_EXIST_CATEGORY":"not found this category"
        },
        "UPDATE_TO_DO_LIST":{
            "SUCCESS":"TO DO LIST updated successfully",
            "NOT_PERMITED":"This user do not have permission to updating a TO DO LIST",
            "ERROR":"Error in updating TO DO LIST"
        },
        "VIEW_TO_DO_LIST":{
            "SUCCESS":"TO DO LIST viewed successfully",
            "NOT_PERMITED":"This user do not have permission to viewed a TO DO LIST",
            "ERROR":"Error in vieded Blog"
        },
        "DELETE_TO_DO_LIST":{
            "SUCCESS":"TO DO LIST deleted successfully",
            "NOT_PERMITED":"This user do not have permission to delete a TO DO LIST",
            "ERROR":"Error in deleting TO DO LIST"
        },
        "BLOG_COUNT":{
            "SUCCESS":"Blog count successfully",
            "ERROR":"Error in blog count!"
        },
        "USER_SEARCH":{
            "SUCCESS":"Search Successfully",
            "NOT_PERMITED":"Minimum 3 character are required!",
            "ERROR":"Error in user serach!"
        },
        "GROUP_TO_DO":{
            "SUCCESS":"successfully count to do list by category",
            "ERROR":"Error in count to do list by category"
        }
        
    }
    return {
        constants: constants,
        message: message
      }
    
}

