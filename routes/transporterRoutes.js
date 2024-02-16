const express=require('express');
const routes=express();
const {
    getTransporterPgae,
    getAllDispatchedOrders,
    changeOrderStatus
}=require('../controllers/transporterControllers');
routes.get('/home',getTransporterPgae);
routes.get('/orders',getAllDispatchedOrders);
routes.put('/orderStatus',changeOrderStatus);

module.exports=routes;