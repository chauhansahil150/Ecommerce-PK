const { sql } = require("./db.js");

function saveProduct(product) {
    return new Promise((resolve, reject) => {
        const query = `insert into products values("${product.p_id}","${product.name}","${product.image}","${product.des}","${product.price}","${product.stock}","${product.seller}",true,NULL)`; //why we use the question mark
        sql.query(query, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}


function fetchProducts() {
    return new Promise((resolve, reject) => {
        const qry = "select * from products";
        sql.query(qry, (err, data) => {
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
        const qry = `insert into users values("${user.id}","${user.name}","${user.email}","${user.password}","${user.phone}","user")`
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

module.exports = {
    fetchProducts,
    createCart,
    findUser,
    createUser,
    saveProduct,
    cartExist,
    fetchcart,
    updateCart
}