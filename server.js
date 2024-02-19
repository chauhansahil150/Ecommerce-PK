const express = require("express");
const server = express();
const { connectToDatabase,sql } = require("./models/db.js");
const {v4:uuid} = require("uuid")
const multer = require("multer");
const path=require('path');


server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(express.static(path.join(__dirname, './public')));

const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes.js");
const adminRoutes=require('./routes/adminRoutes.js');
const transporterRoutes=require('./routes/transporterRoutes.js');
server.use((req,res,next)=>{
    console.log(req.url + "  " + req.method);
    next();
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/images'))
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname
        cb(null, fileName)
    },
  });
  const upload = multer({ storage });

server.use("/",userRoutes)
server.use("/seller",upload.single("img"),sellerRoutes)
server.use("/admin",adminRoutes);
server.use("/transporter",transporterRoutes);
server.get('/unauthorized',(req,res)=>{
    res.status(401).send("Unauthorized");
})
connectToDatabase()
    .then(res => {
        console.log(res);
        server.listen(5000, (err) => {
         // loadtoDB();
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
            // let str = "insert into products values "
            // data.products.forEach(p => {
            //     const obj = {
            //         id: p.id,
            //         img: p.thumbnail,
            //         name: p.title,
            //         price: p.price,
            //         des: p.description,
            //         stock:p.stock
            //     };
            //     const substr = `("${uuid()}", "${obj.name}", "${obj.img}", "${obj.des}", ${obj.price}, ${obj.stock},"tghg" , false , false ),`//apppend kr rhe hai 33
            //     str+=substr;//unnessary column
            // });
            // const qry = str.substring(0,str.length-1);//only type
            // console.log(qry);
       
            // sql.query(qry,(err,data)=>{//execute//datadl gya
            //     (err)?console.log(err):console.log(data);
            // })
//         }).catch(err => [
//             console.log(err)
//         ]);
// }


