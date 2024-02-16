const express = require("express");
const routes = express();
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
routes.post("/signup", signupSeller);
routes.get("/signup", getsignuppage);

routes.get("/home", getsellerhomepage);
routes.get("/addProduct",getAddProductPage);
routes.get("/orders",getOrdersPage);
routes.get("/products", getsellerproducts);
routes.put("/product", updateProduct);
routes.delete("/product", deleteProduct);
routes.get('/customerOrders',getAllCustomerOrders);
routes.put('/order/dispatch',dispatchOrder)

//products
routes.post('/newProduct',addNewProduct)
module.exports = routes;
