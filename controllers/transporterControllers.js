const path=require('path');
const jwt=require("jsonwebtoken");
const {
getAllDispatchedOrdersQuery,
dispatchOrderQuery
}=require('../models/transporterQuery')
function getTransporterPgae(req,res){
    try {
        res.sendFile(path.resolve("views/transporter.html"))
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function getAllDispatchedOrders(req,res){
    try {
        const decoded=jwt.verify(req.headers.authorization,'payal')

        console.log(decoded)
        const orders= await getAllDispatchedOrdersQuery(decoded.area_alloted);
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}


const changeOrderStatus= async(req, res)=>{
    try {
        const status=req.query.status;
        const o_id=req.query.o_id;
        const decoded=jwt.verify(req.headers.authorization,"payal");
        let dispatchedTo;
        if(status=='returned'){
            dispatchedTo='seller';
        }else if(status=='delivered'){
            dispatchedTo='user'
        } 
        const qryRes=await dispatchOrderQuery(o_id,dispatchedTo,status);
        console.log(qryRes);
        if(qryRes.changedRows>0){
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Internal Server Error"});
    }
}


module.exports={
    getTransporterPgae,
    getAllDispatchedOrders,
    changeOrderStatus
}