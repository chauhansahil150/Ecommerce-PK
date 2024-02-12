const path=require('path');
const {getAllSellersRequestsQuery} = require('../models/adminQuery');
function getProductRequestPage(req,res){
    try {
        res.sendFile(path.resolve('views/admin/productRequests.html'))
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
function getSellerRequestPage(req,res){
    try {
        res.sendFile(path.resolve('views/admin/sellerRequests.html'))
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function getAllSellersRequests(req,res){
    try {
        const allSellers=await getAllSellersRequestsQuery();
        console.log(allSellers);
        res.status(200).json(allSellers);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}




module.exports={
    getProductRequestPage,
    getSellerRequestPage,
    getAllSellersRequests
}
