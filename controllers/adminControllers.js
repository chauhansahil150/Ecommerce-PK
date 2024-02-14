const path=require('path');
const jwt=require('jsonwebtoken');
const {getAllSellersRequestsQuery,
    approveSellerRequestQuery,
    rejectSellerRequestQuery,
    getAllProductsRequestsQuery,
    approveProductRequestQuery,
    rejectProductRequestQuery,
} = require('../models/adminQuery');
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

async function approveSellerRequest(req,res){
    try {
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        const u_id=req.query.u_id;
        const qryRes= await approveSellerRequestQuery(u_id);
        if(qryRes.affectedRows>0){
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function rejectSellerRequest(req, res){
    try {
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        const u_id=req.query.u_id;
        const qryRes= await rejectSellerRequestQuery(u_id);
        if(qryRes.affectedRows>0){
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function getAllProductsRequests(req,res){
    try {
        const allProducts=await getAllProductsRequestsQuery();
        console.log(allProducts);
        res.status(200).json(allProducts);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function approveProductRequest(req,res){
    try {
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        const p_id=req.query.p_id;
        const qryRes= await approveProductRequestQuery(p_id);
        if(qryRes.affectedRows>0){
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function rejectProductRequest(req, res){
    try {
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        const p_id=req.query.p_id;
        const qryRes= await rejectProductRequestQuery(p_id);
        if(qryRes.affectedRows>0){
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}



module.exports={
    getProductRequestPage,
    getSellerRequestPage,
    getAllSellersRequests,
    approveSellerRequest,
    rejectSellerRequest,
    approveProductRequest,
    rejectProductRequest,
    getAllProductsRequests
}
