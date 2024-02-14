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

routes.get('/sellerRequestPage',getSellerRequestPage);
routes.get('/productRequestPage',getProductRequestPage);
routes.get('/allSeller',getAllSellersRequests);
routes.put('/sellerApprove',approveSellerRequest)
routes.delete('/sellerReject',rejectSellerRequest)
routes.get('/allProducts',getAllProductsRequests);
routes.put('/productApprove',approveProductRequest)
routes.delete('/productReject',rejectProductRequest)

module.exports=routes;


