const { sql } = require("./db.js");
const {v4:uuid}=require('uuid');

function saveProduct(product) {
    return new Promise((resolve, reject) => {
        const query = `insert into products values("${product.p_id}","${product.name}","${product.image}","${product.des}","${product.price}","${product.stock}","${product.seller}",true,NULL)`; //why we use the question mark
        sql.query(query, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}


function fetchProducts(start,limit) {
    return new Promise((resolve, reject) => {
        const qry = "select * from products where isApproved=1 limit ?,?";
        sql.query(qry,[start,limit], (err, data) => {
            (err) ? reject(err) : resolve(data)
        })
    })
}

const cartExist = ({ p_id, u_id }) => {
    return new Promise((resolve, reject) => {
        const qry = `select * from carts where p_id=? and u_id=?;`
        sql.query(qry, [p_id, u_id], (err, data) => {

            (err) ? reject(err) : resolve(data)
        })
    })
}

const createCart = (cart) => {
    return new Promise((resolve, reject) => {
        const qry = `insert into carts values("${cart.p_id}","${cart.u_id}",1)`
        sql.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

const fetchcart = (u_id) => {
    return new Promise((resolve, reject) => {
        const qry = `select * from carts as c INNER join products as p ON p.p_id = c.p_id where c.u_id="${u_id}"`
        sql.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        const qry = `select * from users where email = "${email}"`
        sql.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

const createUser = (user) => {//signup
    return new Promise((resolve, reject) => {
        const qry = `insert into users (u_id,name,email,password,phone,role) values("${user.id}","${user.name}","${user.email}","${user.password}","${user.phone}","user")`
        sql.query(qry, (err, res) => {//query execte
            (err) ? reject(err) : resolve(res)

        })
    })
}

const updateCart = (quant, dCart) => {
    return new Promise((resolve, reject) => {
        if (dCart) {
            const qry = `delete from carts where p_id = "${dCart.p_id}" and u_id = "${dCart.u_id}"`
            sql.query(qry, (err, res) => {
                err ? reject(err) : resolve(res)
            })
        }
       if(quant){
        const qry = `update carts set quantity = ${quant.quantity} where p_id = "${quant.p_id}" and u_id = "${quant.u_id}"`
        sql.query(qry, (err, res) => {
            err ? reject(err) : resolve(res)
        })
       }
    })
}

function saveaddress(userId, body,address_id) {
    return new Promise((resolve, reject) => {
      const adressQuery = `INSERT INTO address values (?,?,?,?,?,?,?,?)`;
      sql.query(
        adressQuery,
        [
          address_id,
          userId,
          body.line1,
          body.line2,
          body.city,
          body.state,
          body.pincode,
          body.phone,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
      //select price from products where product_id=?
    });
  }
  function getAllOrders(userId) {
    return new Promise((resolve, reject) => {
      const cartdata = `select * from carts where u_id=?`;
      sql.query(cartdata, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  function saveorder(userId,cartProduct, address_id, payment_mode) {
    return new Promise((resolve, reject) => {
        const order_id=uuid();
      const cartdata = `select price,seller_id from products where p_id="${cartProduct.p_id}"`;
      sql.query(cartdata, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results)
          const query = `INSERT INTO orders (o_id,u_id,p_id,s_id,a_id, quantity, total_amount,payment_mode)
              values (?,?,?,?,?,?,?,?)`;
          sql.query(
            query,
            [
              order_id,
              userId,
              cartProduct.p_id,
              results[0].seller_id,
              address_id,
              cartProduct.quantity,
              results[0].price * cartProduct.quantity,
              payment_mode,
            ],
            (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }
  const emptyCartOfUser = async (userId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM carts WHERE u_id=?`;
      sql.query(query, [userId], (err, results) => {
       err?reject(err):resolve(results)
      });
    });
  };

  function getMyOrdersQuery(userId){
    return new Promise((resolve,reject)=>{
      const query=` SELECT * from orders o inner join products p
      on p.p_id=o.p_id
      WHERE o.u_id=?;
      `;
      sql.query(query,[userId],(error,results)=>{
        if(error){
          reject(error);
        }else{
          resolve(results);
        }
      });
    });
  }

  function cancelOrderQuery(o_id,reason,cancel_date){
    return new Promise((resolve,reject)=>{
         let selectProductSQL;
           selectProductSQL=`
           UPDATE orders 
   SET status = 'cancelled',
       cancel_date = '${cancel_date}',
       cancel_reason = '${reason}' 
   WHERE o_id = '${o_id}';
   `;
         sql.query(selectProductSQL,(err,data)=>{
          err?reject(err):resolve(data);
         });
       });
   }

module.exports = {
    fetchProducts,
    createCart,
    findUser,
    createUser,
    saveProduct,
    cartExist,
    fetchcart,
    updateCart,
    saveaddress,
    getAllOrders,
    saveorder,
    emptyCartOfUser,
    getMyOrdersQuery,
    cancelOrderQuery
}