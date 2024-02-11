const mysql = require("mysql2");
const sql = mysql.createConnection({ uri: "mysql://root:@localhost:3306/ecommerce" })

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        sql.connect(err => {
            (err) ? reject(err) : resolve("db connnected");
        })
    })
}

module.exports={sql,connectToDatabase};