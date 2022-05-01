// ############# PRIMARY ROUTER ###########

var express = require("express")
var rootRouter = express.Router()

var bodyParser = require("body-parser")
var mysql = require("mysql")
var bcrypt = require("bcrypt")
var connection = require("../database/db")
var path = require("path")
var dbuse = process.env.DB_USE

//const { validator } = require("../validator")

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
    message: "",
    dbuse: dbuse,
    req,
  })
})

//Login
rootRouter.get("/login", function (req, res) {
  res.render("pages/login.ejs", { message: "", dbuse: dbuse, req })
})

//Login
rootRouter.get("/logout", function (req, res) {
  console.log("Destroing session...")
  req.session.destroy()
  res.render("pages/index.ejs", {
    message: "NO_USER",
    dbuse: dbuse,
    req,
  })
})

//Login
rootRouter.get("/tables", function (req, res) {
  res.render("pages/tables.ejs", { message: "", dbuse: dbuse, req })
})

/*
rootRouter.get("/test", function (req, res) {
  var myVar = "GCTEST";
  res.render("test", { myVar: myVar });
});
*/

/* Authentication for login */
rootRouter.post("/auth_login", urlencodedParser, (req, res, next) => {
  //console.log("req.session: " + req.session);
  var username = req.body.username
  var password = req.body.password

  var sql = "select * from users where username = ?;"

  connection.query(sql, [username], (err, result, fields) => {
    if (err) throw err
    // var hashedPassword = bcrypt.compareSync(password, result[0].password)
    if (result.length && password == result[0].password) {
      req.session.username = username
      //res.redirect('/home')
      res.render("pages/index.ejs", { message: username, dbuse: dbuse, req })
    } else {
      //req.session.flag = 4
      //res.redirect("/login")
      var message = "Login failed! Please retry!"
      res.render("pages/login.ejs", { message: message })
    }
  })
})

rootRouter.get("/auth_login", (req, res, next) => {
  //console.log("======> index router / auth_login ")
  //res.send('auth_login page')
  var message = "User Not Logged! Get"
  res.render("test", { message: message })
})

module.exports = rootRouter
