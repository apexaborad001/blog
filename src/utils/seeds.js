const mongoose= require("mongoose")
const Users = require("../model/user.model")
const index = require("../index")
const seed=[
    {
        userName:"bhavika",
        email:"bhavika08@gmail.com",
        role:'user',
        password:"bhavika120",
        permissions:{
            blog:[1,1,0,0],
            toDoList:[0,1,1,1]
        }
    },{
        userName:"yash",
        email:"yash@gmail.com",
        role:'user',
        password:"yash1",
        permissions:{
            blog:[1,1,1,0],
            toDoList:[0,1,1,1]
        }
    },{
        userName:"shruti",
        email:"shruti@gmail.com",
        role:'user',
        password:"sruti08",
        permissions:{
            blog:[1,1,1,0],
            toDoList:[0,1,1,1]
        }
    }
  ]
  
  const seedDb = async()=>{
    console.log("fghjkl");
    await Users.insertMany(seed);
  }
seedDb().then(()=>{
   console.log("seeded");
  }).catch((e)=>{
    console.log(e)
  })
  
   