const express = require("express");
const server = express();
const { connectToDatabase,sql } = require("./models/db.js");
const {v4:uuid} = require("uuid")

server.use(express.json())
server.use(express.urlencoded())
server.use(express.static("public/"))

const userRoutes = require("./routes/userRoutes");
server.use((req,res,next)=>{
    console.log(req.url + "  " + req.method);
    next();
})
server.use("/",userRoutes)

connectToDatabase()
    .then(res => {
        console.log(res);
        server.listen(5000, (err) => {
          //  loadtoDB();
            console.log("successfully started");
        })
    }).catch(err => {
        console.log(err);
    })
    
// function loadtoDB() {
//     fetch("https://dummyjson.com/products?skip=0&limit=101")
//         .then((result) => {
//             console.log(result);
//             return result.json();
//         }).then((data) => {
//              console.log(data);
//             // let str = "insert into products values "
//             // data.products.forEach(p => {
//             //     const obj = {
//             //         id: p.id,
//             //         img: p.thumbnail,
//             //         name: p.title,
//             //         price: p.price,
//             //         des: p.description,
//             //         stock:p.stock
//             //     };
//             //     const substr = `("${uuid()}", "${obj.name}", "${obj.img}", "${obj.des}", ${obj.price}, ${obj.stock},"tghg" , false , false ),`//apppend kr rhe hai 33
//             //     str+=substr;//unnessary column
//             // });
//             // const qry = str.substring(0,str.length-1);//only type
//             // console.log(qry);
       
//             // sql.query(qry,(err,data)=>{//execute//datadl gya
//             //     (err)?console.log(err):console.log(data);
//             // })
//         }).catch(err => [
//             console.log(err)
//         ]);
// }


