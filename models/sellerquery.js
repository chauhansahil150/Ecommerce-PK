const { sql } = require("./db.js");

function savesellerdetailuser(data) {
    return new Promise((resolve, reject) => {
        const qry = `insert into users values("${data.id}","${data.name}","${data.email}","${data.password}","${data.phonenumber}","user")`
        sql.query(qry, (e, r) => {
            e ? reject(e) : resolve(r)
        })
    })
}
function savesellerdetailseller(data) {
    return new Promise((resolve, reject) => {
        const qry2 = `insert into sellerdetails values("${data.id}","${data.adharnumber}","${data.adharimg}","${data.pannumber}","${data.panimage}")`
        sql.query(qry2, (err, data) => {
            err ? reject(err) : resolve(data)
        })

    })
}

function getsellerproductquery(sellerid) {
    return new Promise((resolve, reject) => {
        const qry = `select * from products where seller_id =${sellerid}`
        sql.query(qry, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}



module.exports = { savesellerdetailuser, savesellerdetailseller,getsellerproductquery }

