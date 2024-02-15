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
    const qry2 = `insert into sellerdetails values("${data.id}","${data.adharnumber}","${data.adharimg}","${data.pannumber}","${data.panimage}")`;
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
    const query=`SELECT * FROM orders WHERE s_id=? and dispatched_to=? `;
    sql.query(query,[sellerId,'seller'],(err,data)=>{
     err?reject(err):resolve(data);
    });
  });
}

module.exports = {
  savesellerdetailuser,
  savesellerdetailseller,
  getsellerproductquery,
  updateProductQuery,
  deleteProductQuery,
  savesellerdetailAddress,
  getAllCustomerOrdersQuery
};
