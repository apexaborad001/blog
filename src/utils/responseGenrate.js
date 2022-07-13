const responseGenerator=(scode,errorV,msg,data)=>{
    // const startTime = process.hrtime();
    const response = {
        StatusCode:scode,
        Error:errorV,
        Message:msg,
        Data:data
    }
    
    return response
}

// const responseTime = ((req, res, next)=>{
//     const startTime = process.hrtime();
  
//     res.on('finish', ()=>{
//       const totalTime = process.hrtime(startTime);
//       const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
//       console.log(totalTimeInMs);
//     });
    
//     next();
//   })
  
//   module.exports = responseTime;
  
module.exports=responseGenerator