const express = require("express");
const routes = express();
const jwt=require('jsonwebtoken');
const {
  signupSeller,
  getsignuppage,
  getsellerhomepage,
  getsellerproducts,
  updateProduct,
  deleteProduct,
  getAddProductPage,
  getOrdersPage,
  getAllCustomerOrders,
  dispatchOrder,
  addNewProduct
} = require("../controllers/sellerControllers");

const isSeller=(req,res,next)=>{
  const decoded=jwt.verify(req.headers.authorization,'payal');
  if(decoded.role=='seller'){
    next();
  }else{
    res.redirect('/unauthorized');
    return;
  }
}
routes.post("/signup", signupSeller);
routes.get("/signup", getsignuppage);

routes.get("/home",getsellerhomepage);
routes.get("/addProduct",getAddProductPage);
routes.get("/orders",getOrdersPage);
routes.get("/products",isSeller, getsellerproducts);
routes.put("/product",isSeller, updateProduct);
routes.delete("/product",isSeller, deleteProduct);
routes.get('/customerOrders',isSeller,getAllCustomerOrders);
routes.put('/order/dispatch',isSeller,dispatchOrder)

//products
routes.post('/newProduct',addNewProduct)
module.exports = routes;
