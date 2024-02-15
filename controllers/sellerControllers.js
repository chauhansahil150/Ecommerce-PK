const path = require("path");
const { v4: uuid } = require("uuid");
const {
  savesellerdetailuser,
  savesellerdetailseller,
  getsellerproductquery,
  updateProductQuery,
  deleteProductQuery,
  savesellerdetailAddress,
  getAllCustomerOrdersQuery
} = require("../models/sellerquery");
const { fetchProducts } = require("../models/Query");
const jwt = require("jsonwebtoken");
const signupSeller = async (req, res) => {

  
  try {
    const id = uuid();
    const {
      name,
      email,
      password,
      adharnumber,
      adharimg,
      pannumber,
      panimage,
      adressline1,
      adressline2,
      city,
      state,
      pincode,
      phonenumber,
    } = req.body;
    const dataquery = await savesellerdetailuser({
      name,
      email,
      password,
      adharnumber,
      adharimg,
      pannumber,
      panimage,
      adressline1,
      adressline2,
      city,
      state,
      pincode,
      phonenumber,
      id,
    });
    const dataquery2 = await savesellerdetailseller({
      name,
      email,
      password,
      adharnumber,
      adharimg,
      pannumber,
      panimage,
      adressline1,
      adressline2,
      city,
      state,
      pincode,
      phonenumber,
      id,
    });
    const a_id=uuid();
    const dataqury3= await savesellerdetailAddress({
      a_id,
      id,
      adressline1,
      adressline2,
      city,
      state,
      pincode,
      phonenumber
    });

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const getsignuppage = async (req, res) => {
  try {
    res.sendfile(path.resolve("views/seller/sellersignup.html"));
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
const getsellerhomepage =  (req, res) => {
  try {
    res.sendfile(path.resolve("views/seller/sellerhomepage.html"));
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

const getAddProductPage=(req,res)=>{
  try {
    res.sendfile(path.resolve("views/seller/selleraddproduct.html"));

  } catch (error) {
    console.log(error);

  }
}
const getOrdersPage=(req,res)=>{
  try {
    res.sendfile(path.resolve("views/seller/sellerOrders.html"));

  } catch (error) {
    console.log(error);

  }
}
const getsellerproducts = async (req, res) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, "payal");
    const productdata = await getsellerproductquery(decoded.u_id);
    console.log(productdata);
    res.status(200).json(productdata);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};


const updateProduct = async (req, res) => {
  try {
    const {name,des,price,stock}=req.body;
    const p_id = req.query.p_id;
    var decoded = jwt.verify(req.headers.authorization, "payal");
    const queryRes = await updateProductQuery({name,des,price,stock,p_id});
    console.log(queryRes);
    if(queryRes.affectedRows>0){
      res.status(200).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteProduct = async (req, res) => {
  try {
    const p_id = req.query.p_id;
    var decoded = jwt.verify(req.headers.authorization, "payal");
    const queryRes = await deleteProductQuery(p_id,decoded.u_id);
    if(queryRes.affectedRows>0){
      res.status(200).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};


const getAllCustomerOrders= async (req,res)=>{
  try {
    var decoded = jwt.verify(req.headers.authorization, "payal");
    const customerOrders=await getAllCustomerOrdersQuery(decoded.u_id);
    res.status(200).json(customerOrders);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}



module.exports = {
  signupSeller,
  getsignuppage,
  getsellerhomepage,
  getsellerproducts,
  updateProduct,
  deleteProduct,
  getAddProductPage,
  getOrdersPage,
  getAllCustomerOrders
  
};
