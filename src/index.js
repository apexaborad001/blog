const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoURI = require("../src/db/db.config");
const router = require("../src/router/user.router");
const dbSwitch = require("./middleware/databaseSwitch");
const logger = require("../src/logger/api.logger");
// const responseTime=require("../src/utils/responseGenrate")
const Users= require("../src/model/user.model")
// const seedUser= require("../src/utils/seeds")
//app.use(constants)
var mung = require('express-mung');
const cors = require('cors');
const { application } = require("express");
// var time = require("./time")
// app.use(time)
// console.log(Time)

// app.use(responseTime((req, res, time) => {
//     // console.log(req.method, req.url, time + 'ms');

//     req.timeTaken=`${time}ms`
    
//     // console.log(req.timeTaken)
//   }));
// app.use(responseTime)
// var morgan = require('morgan')
// morgan.token('id', function getId (req) {
//   return req.id
// })

// app.use(assignId)
// app.use(morgan(':id :method :url :response-time'))
// app.use(morgan('dev'))
// app.use(morgan(':responseTime'))

mongoose
  .connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology:true})
  .then((res) => console.log(`Connection Successful ${res}`))
  .catch((err) => console.log(`Error in DB connection ${err}`));



const port = process.env.PORT || 3000;   
app.use(cors())
app.use(mung.json(function transform(body, req, res, next) {
    let name = req.url;
    let response = body;
    // let time=responseTime.responseTime
    // console.log(time())
    // console.log(timeFun)
    if (req.constants.is_debug) {
        
      if (req.decode) {
        logger.log(name, req, response,"user", req.decode._id, true);
      }else {
          logger.log(name,req,response)
        }      
    } 
  }));
app.use("/", dbSwitch, router);

app.listen(port, () => {
  console.log("app is running on http://localhost:3000/");
});

