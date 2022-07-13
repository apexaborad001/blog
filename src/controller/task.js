const { estimatedDocumentCount } = require("../model/user.model");

var arr = [
  {
    id: 1,
    name: "A",
    age: 20,
  },
  {
    id: 2,
    name: "B",
    age: 22,
  },
];

var arr1 = [
  {
    1: 11,
    A: "KL",
    20: "10-APR",
  },
  {
    2: 22,
    B: "ML",
    22:"20-MAR",
  },
];

// const a=(a,b)=>{
// const apex=arr.map(e=>{

//     return `${e.a}_${e.b}`
// })
// // console.log(apex)

//     return `${arr.a}_${arr.b}`

// console.log(arr.find((a,b)=>{
//      return `${a}_${b}`
// }))
// }
// console.log(a(arr.id,arr.age));

// function arrans(...args){
//     arr.map(e=>{
//         return `${e.args[0]}_${e.args[1]}`
//     })
// }
// arrans("id","age")
// function x(a,b){
//     for(let i of arr){
//         return `${i.a}_${i.b}`
//     }
// }
// console.log(x())

// function ap(a,b){
//     return arr.forEach(e=>{
//         return `${e.a}_${e.b}`
//     })
// }
// console.log(ap("id","name"))
var empty = [];
let i = ["id", "name"];
arr.forEach((e) => {
  let temp = [];
  i.forEach((v) => {
    arr1.forEach((ele) => {
      if (ele[e[v]]) {
        temp.push(ele[e[v]]);
      }
    });
  });
  empty.push(temp.join("_"));
});
console.log(empty);
