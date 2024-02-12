const {sql} = require('./db');

function getAllSellersRequestsQuery(){
    return new Promise((resolve,reject)=>{
        const qry=`SELECT * from sellerdetails s
        left JOIN users u on 
     s.u_id=u.u_id left join address a
     on a.u_id=u.u_id`;
     sql.query(qry,(err,data)=>{
        err?reject(err):resolve(data);
     })
    })
}

module.exports={
    getAllSellersRequestsQuery
}