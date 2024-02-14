const express = require("express");
const userRoutes = express();
const {
  homepage,
  addToCart,
  showproducts,
  loginUser,
  usersignup,
  sendsignuppage,
  showloginpage,
  showcartpage,
  getusercarts,
  updateCartQuantity,
  deleteCartProduct,
  getPlaceOrderPage,
  placeOrder,
  getMyOrdersPage,
  getMyOrders
} = require("../controllers/userControllers");

function checkauth(req, res, next) {}

userRoutes.get("/", homepage);

userRoutes.get("/products", showproducts);

userRoutes.route("/login").get(showloginpage).post(loginUser);

userRoutes.route("/signup").get(sendsignuppage).post(usersignup);

userRoutes.route("/carts").get(showcartpage);

userRoutes
  .route("/cart")
  .get(getusercarts)
  .post(addToCart)
  .patch(updateCartQuantity)
  .delete(deleteCartProduct);

userRoutes.get("/cart/place-order", getPlaceOrderPage);
userRoutes.post("/cart/place-order", placeOrder);
userRoutes.get("/orderPage",getMyOrdersPage);
userRoutes.get("/orders",getMyOrders);

module.exports = userRoutes;
