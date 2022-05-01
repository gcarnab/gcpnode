// ############# PRIMARY ROUTER ###########

var express = require("express")
var rootRouter = express.Router()

var bodyParser = require("body-parser")
var mysql = require("mysql")
var bcrypt = require("bcrypt")
var connection = require("../database/db")
var path = require("path")
//const { validator } = require("../validator")

//READING CONFIGURATION VARIABLES
var dbuseFlag = process.env.DB_USE
var mysqlFlag = process.env.DB_USE_MYSQL
var jsonFlag = process.env.DB_USE_JSON
var mongoFlag = process.env.DB_USE_MONGO

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Defining multiple routers */
var crudRouter = require("./crudRouter")
var userRouter = require("./userRouter")
var mongoRouter = require("./mongoRouter")

rootRouter.use("/user", userRouter)
rootRouter.use("/crud", crudRouter)
rootRouter.use("/mongo", mongoRouter)

//Home
rootRouter.get("/", function (req, res) {
  //res.send('Index Page')
  req.session.destroy()
  res.render("pages/index.ejs", {
    message: "UNDEFINED",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
    req,
  })
})

//about
rootRouter.get("/about", function (req, res) {
  res.render("pages/about.ejs", {
    message: "UNDEFINED",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
    req,
  })
})

//Login
rootRouter.get("/login", function (req, res) {
  res.render("pages/login.ejs", {
    req,
    message: "",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
  })
})

//Login
rootRouter.get("/logout", function (req, res) {
  console.log("Destroing session...")
  req.session.destroy()
  res.render("pages/index.ejs", {
    req,
    message: "UNDEFINED",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
  })
})

//Login
rootRouter.get("/tables", function (req, res) {
  res.render("pages/tables.ejs", {
    req,
    message: "",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
  })
})

/* Authentication for login */
rootRouter.post("/auth_login", urlencodedParser, (req, res, next) => {
  //console.log("req.session: " + req.session);
  var username = req.body.username
  var password = req.body.password

  var sql = "select * from users where username = ?;"

  connection.query(sql, [username], (err, result, fields) => {
    if (err) throw err
    var hashedPassword = bcrypt.compareSync(password, result[0].password)
    if (result.length && password == result[0].password) {
      req.session.username = username
      res.render("pages/index.ejs", {
        req,
        message: username,
        dbuseFlag: dbuseFlag,
        mysqlFlag: mysqlFlag,
        jsonFlag: jsonFlag,
        mongoFlag: mongoFlag,
      })
    } else {
      var message = "Login failed! Please retry!"
      res.render("pages/login.ejs", { message: message })
    }
  })
})

module.exports = rootRouter
