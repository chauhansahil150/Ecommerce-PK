const express = require("express");
const routes = express();
const {signupSeller ,getsignuppage,getsellerhomepage,getsellerproducts}=require("../controllers/sellerControllers") 
routes.post("/signup",signupSeller)
routes.get("/signup",getsignuppage)

routes.get("/home",getsellerhomepage)
routes.get("/products",getsellerproducts)






module.exports= routes;

