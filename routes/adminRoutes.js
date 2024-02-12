const express=require('express');
const routes=express();
const {
    getSellerRequestPage,
    getProductRequestPage,
    getAllSellersRequests
}=require('../controllers/adminControllers');

routes.get('/sellerRequestPage',getSellerRequestPage);
routes.get('/productRequestPage',getProductRequestPage);
routes.get('/allSeller',getAllSellersRequests)

module.exports=routes;


