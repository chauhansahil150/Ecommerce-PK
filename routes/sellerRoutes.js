const express = require("express");
const routes = express();
const {signupSeller ,getsignuppage}=require("../controllers/sellerControllers") 
routes.post("/signup",signupSeller)
routes.get("/signup",getsignuppage)





module.exports= routes;

