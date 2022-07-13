
const sendEmail=require("../utils/sendEmail")
const APIModel=require("../model/apilog");
const timeT=require("../time")
// console.log(timeT)
let log=async(...args)=>{
    try {

        let reqBody = {
            ...args[1].body,
            ...args[1].headers,
            ...args[1].query,

        }
        
        // console.log(args[3])
        // console.log(args[1])
        if(args[1].constants.is_debug){
            let res =[];
            res.push(args[2])
    
            if(args[1].constants.DEBUG_TYPE=="email"){
                console.log("email")
                let dataToBeSend={
                    APImethod:JSON.stringify(args[1].method),
                    APIURL:args[1].BASE_URL+":3000"+args[1].url,
                    DeviceType:JSON.stringify(args[1].headers.device_type),
                    requestBody:JSON.stringify(reqBody),
                    responseBody:JSON.stringify(res)
                }
                sendEmail(JSON.stringify(dataToBeSend))
            }else if(args[1].constants.DEBUG_TYPE=="database"){
                // console.log("database")
                const APIlogs=new APIModel({
                    APImethod:args[1].method,
                    APIURL:args[1].BASE_URL+":3000"+args[1].url,
                    DeviceType:JSON.stringify(args[1].headers.device_type),
                    requestBody:JSON.stringify(reqBody),
                    responseBody:JSON.stringify(res),
                    time:new Date()-timeT
                })
                await APIlogs.save()
            }
        }
    } catch (error) {
        let err={
            apiName:"api logger",
            error:error,
            requestedOn:new Date()
        }
        sendEmail(err)
    }
}


module.exports = {
    log: async(...args) => {
  
      log(...args);
  
    },
    
  }
  