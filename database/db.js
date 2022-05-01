// ############# DB MANAGER ###########
var mysql = require("mysql")
require("dotenv").config()

if (process.env.DB_USE == "true") {
  /*   var connection = mysql.createPool({
    host: process.env.INSTANCE_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }) */

  var connection = mysql.createConnection({
    host: process.env.INSTANCE_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: parseInt(process.env.MYSQL_CON_TIMEOUT),
    acquireTimeout: parseInt(process.env.MYSQL_ACQ_TIMEOUT),
  })

  connection.connect((err) => {
    if (err) {
      console.log("###### MySQL DB connection error... " + err.message)
      //throw err
    } else {
      console.log("===> MySQL DB Connected...")
    }
  })
}

module.exports = connection
