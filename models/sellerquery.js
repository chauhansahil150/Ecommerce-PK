const { sql } = require("./db.js");

function savesellerdetailuser(data) {
  return new Promise((resolve, reject) => {
    const qry = `insert into users values("${data.id}","${data.name}","${data.email}","${data.password}","${data.phonenumber}","user")`;
    sql.query(qry, (e, r) => {
      e ? reject(e) : resolve(r);
    });
  });
}
function savesellerdetailseller(data) {
  return new Promise((resolve, reject) => {
    const qry2 = `insert into sellerdetails values("${data.id}","${data.adharnumber}","${data.adharimg}","${data.pannumber}","${data.panimage}",0)`;
    sql.query(qry2, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
  
}
function savesellerdetailAddress(data){
  return new Promise((resolve,reject)=>{
    const qry3=`insert into address values ("${data.a_id}","${data.id}","${data.adressline1}","${data.adressline2}","${data.city}","${data.state}","${data.pincode}","${data.phonenumber}")`
    sql.query(qry3,(err,data)=>{
      err? reject(err):resolve(data);
    })
 
  })
}

function getsellerproductquery(sellerid) {
  return new Promise((resolve, reject) => {
    const qry = `select * from products where seller_id =?`;
    sql.query(qry, [sellerid], (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

function updateProductQuery({name,des,price,stock,p_id}) {
  return new Promise((resolve, reject) => {
    const qry = `UPDATE products set name=?,des=?,price=?,stock=? WHERE p_id=?`;
    sql.query(qry, [name,des,price,stock,p_id], (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

function deleteProductQuery(p_id,u_id){
  return new Promise((resolve,reject)=>{
    const qry=`delete from products where p_id="${p_id}" and seller_id="${u_id}"`;
    sql.query(qry,(err,data)=>{
      err?reject(err):resolve(data);
    })
  })
}

function getAllCustomerOrdersQuery(sellerId){
  return new Promise((resolve,reject)=>{
    const query=`SELECT o.*, p.* , a.*
    FROM orders o
    LEFT JOIN products p ON o.p_id = p.p_id 
    JOIN address a ON o.a_id=a.a_id
    where o.s_id=? and o.dispatched_to=? `;
    sql.query(query,[sellerId,'seller'],(err,data)=>{
     err?reject(err):resolve(data);
    });
  });
}

function dispatchOrderQuery(o_id,dispatch_to,status){
  return new Promise((resolve,reject)=>{
    if(status=='delivered'){
           query=`UPDATE orders SET dispatched_to=?,delivery_date=now(),status=? WHERE o_id=?`;
    }else{
       query=`UPDATE orders SET dispatched_to=?,status=? WHERE o_id=?`;
    }
    sql.query(query,[dispatch_to,status,o_id],(err,data)=>{
     err?reject(err):resolve(data);
    })
  });
}

function addNewProductQuery({p_id,name, des, price, stock, imageUrl,u_id}){
   return new Promise((resolve,reject)=>{
    const qry = `
    INSERT INTO products (p_id,seller_id,name, des, price,stock,image)
    VALUES (?,?, ?, ?,?,?,?)
  `;

  sql.query(qry, [p_id,u_id,name, des,price,stock,imageUrl], (err,data)=>{
    err?reject(err):resolve(data);
  });
   })
  
}

module.exports = {
  savesellerdetailuser,
  savesellerdetailseller,
  getsellerproductquery,
  updateProductQuery,
  deleteProductQuery,
  savesellerdetailAddress,
  getAllCustomerOrdersQuery,
  dispatchOrderQuery,
  addNewProductQuery
};
