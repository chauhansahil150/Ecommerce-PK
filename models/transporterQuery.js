const {sql} = require('../models/db');

function getAllDispatchedOrdersQuery(area_alloted){
    return new Promise((resolve,reject)=>{
        const qry=`SELECT o.o_id,o.payment_mode,o.total_amount,a.* from orders o left JOIN
        address a on o.a_id=a.a_id
        WHERE o.dispatched_to=?`
        sql.query(qry,[area_alloted],(err,data)=>{
            err?reject(err):resolve(data);
        })
    });
}

function dispatchOrderQuery(o_id,dispatchedTo,status){
    return new Promise((resolve,reject)=>{
      const deliveryDate=new Date().toLocaleString();
      let qry;
      if(status=='delivered'){
             qry=`UPDATE orders SET dispatched_to=?,delivery_date=now(),status=? WHERE o_id=?`;
      }else{
         qry=`UPDATE orders SET dispatched_to=?,status=? WHERE o_id=?`;
      }
      sql.query(qry,[dispatchedTo,status,o_id],(err,data)=>{
        err?reject(err):resolve(data);
      })
    });
  }
module.exports={
    getAllDispatchedOrdersQuery,
    dispatchOrderQuery
}