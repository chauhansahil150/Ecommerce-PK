const {sql} = require('./db');

function getAllSellersRequestsQuery(){
    return new Promise((resolve,reject)=>{
        const qry=`SELECT s.*,u.name,u.email,a.a_id,a.city,a.line1,a.line2,a.phone,a.pincode,a.state from sellerdetails s
        left JOIN users u on 
     s.u_id=u.u_id left join address a
     on a.u_id=u.u_id
     where s.isApproved=false
     `;
     sql.query(qry,(err,data)=>{
        err?reject(err):resolve(data);
     })
    })
}

function approveSellerRequestQuery(id){
    return new Promise((resolve,reject)=>{
        const qry=`UPDATE users u,sellerdetails sd
        set u.role='seller',sd.isApproved=1
        WHERE sd.u_id="${id}"
        and u.u_id="${id}"`
        sql.query(qry,(err,data)=>{
            err?reject(err):resolve(data);
        })
    })
}

function rejectSellerRequestQuery(id){
    return new Promise((resolve,reject)=>{
        const qry=`delete from sellerdetails where u_id="${id}"`;
        sql.query(qry,(err,data)=>{
            if(err){
                reject(err)
            }else{
                const qry2=`delete from users where u_id="${id}"`
                sql.query(qry2,(err,data)=>{
                    err?reject(err):resolve(data);
                })
            }
        })
    })
}

function approveProductRequestQuery(id){
    return new Promise((resolve,reject)=>{
        const qry=`update products set isApproved=1 where p_id="${id}"`;
        sql.query(qry,(err,data)=>{
            err?reject(err):resolve(data);
        })
    })
}
function rejectProductRequestQuery(id){
    return new Promise((resolve,reject)=>{
        const qry=`update products set isRejected=1 where p_id="${id}"`;
        sql.query(qry,(err,data)=>{
            err?reject(err):resolve(data);
        })
    })
}

function getAllProductsRequestsQuery(){
    return new Promise((resolve,reject)=>{
        const qry=`select * from products where 
        isApproved=0 and isRejected=0`
        sql.query(qry,(err,data)=>{
            err?reject(err):resolve(data);
        })
    })
}

module.exports={
    getAllSellersRequestsQuery,
    approveSellerRequestQuery,
    rejectSellerRequestQuery,
    getAllProductsRequestsQuery,
    approveProductRequestQuery,
    rejectProductRequestQuery
}