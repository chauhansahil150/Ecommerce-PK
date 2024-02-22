const express=require('express');
const routes=express();
const {
    getSellerRequestPage,
    getProductRequestPage,
    getAllSellersRequests,
    approveSellerRequest,
    rejectSellerRequest,
    getAllProductsRequests,
    approveProductRequest,
    rejectProductRequest
}=require('../controllers/adminControllers');
const jwt=require('jsonwebtoken');
const isAdmin=(req,res,next)=>{
    if(req.headers.authorization=='null'){
      console.log("if")
      res.redirect('/unauthorized'); //
      return;
    };
    const decoded=jwt.verify(req.headers.authorization,'payal');
    if(decoded.role=='admin'){
      next();
    }else{
      res.redirect('/unauthorized');
      return;
    }
  }
routes.get('/sellerRequestPage',getSellerRequestPage);
routes.get('/productRequestPage',getProductRequestPage);
routes.get('/allSeller',isAdmin,getAllSellersRequests);
routes.put('/sellerApprove',isAdmin,approveSellerRequest)
routes.delete('/sellerReject',isAdmin,rejectSellerRequest)
routes.get('/allProducts',isAdmin,getAllProductsRequests);
routes.put('/productApprove',isAdmin,approveProductRequest)
routes.delete('/productReject',isAdmin,rejectProductRequest)

module.exports=routes;


