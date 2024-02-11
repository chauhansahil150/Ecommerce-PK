const express=require('express')
const userRoutes=express();
const {homepage, addToCart, showproducts, loginUser, usersignup,sendsignuppage,showloginpage,showcartpage, getusercarts, updateCartQuantity, deleteCartProduct}=require("../controllers/userControllers")

function checkauth(req,res,next){
    


}

userRoutes.get("/",homepage)

userRoutes.get("/products",showproducts)


userRoutes.route("/login")
.get(showloginpage)
.post(loginUser)

userRoutes.route("/signup")
.get(sendsignuppage)
.post(usersignup)

userRoutes.route("/carts" )
.get(showcartpage)

userRoutes.route("/cart" )
.get(getusercarts)
.post(addToCart)
.patch(updateCartQuantity)
.delete(deleteCartProduct)

userRoutes.route("/orders")
.get()
.post()
.delete()

module.exports=userRoutes ;