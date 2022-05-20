// Copyright 2022 GCARNAB
// gcpnode entry point

var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")
var createError = require("http-errors")
var session = require("express-session")
var { v4: uuidv4 } = require("uuid")
var validator = require("express-validator")
var methodOverride = require("method-override")

//OTHERS APP MODULES VARIABLES
var appMongo

//*******> DEFINING OTHER APPS (DEV ONLY)
if (process.env.ENV_DEV == "true") {
  appMongo = require("./apps/mongo/app.js")
}

//*******>  DB SETTINGS
var cloudSqlConnection
if (process.env.DB_USE_CLOUDSQL == "true") {
  cloudSqlConnection = require("./database/db_cloud.js")
}
var mysql = require("mysql")
//var jsonServer = require("json-server")

//*******> LOGGING SETTINGS
var morgan = require("morgan")
var fs = require("fs")
var rfs = require("rotating-file-stream")

//ENVIRONMENT VARIABLES
require("dotenv").config()
if (process.env.DEBUG == "true") {
  console.log("######################################")
  console.log("process.env.MAIN_SERVER_PORT= " + process.env.MAIN_SERVER_PORT)
  console.log("process.env.ENV_PROD= " + process.env.ENV_PROD)
  console.log("process.env.ENV_DEV= " + process.env.ENV_DEV)
  console.log("process.env.DB_USE= " + process.env.DB_USE)
  console.log("DB_USE_MYSQL= " + process.env.DB_USE_MYSQL)
  console.log("DB_USE_JSON= " + process.env.DB_USE_JSON)
  console.log("######################################")
}

//*******> Creating express server <*******
const app = express()

if (process.env.DB_USE_MYSQL == "true") {
  var connection = require("./database/db")
  // connecting route to Mysql DB
  app.use(function (req, res, next) {
    req.conn = connection
    next()
  })
}

if (process.env.DB_USE_JSON == "true") {
  // JSON Server
  //app.use("/json", jsonServer.router("./database/db.json"))
}

//*******> TEMPLATE ENGINE SETTINGS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//*******> importing routes using one main router includin others
var rootRouter = require("./routes/index")

//*******> ACTIONS FOR DEVELOPMENT MODE
if (process.env.ENV_DEV == "true") {
  // development error handler will print stacktrace
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err,
    })
  })

  /*   app.use(function (req, res, next) {
    //next(createError(404))
    //res.sendFile("404.html", { root: path.join(__dirname, "./views") })
    res.render("pages/404", { message: createError(404) })
  }) */

  // ENABLING LOGGING
  // create a write stream (in append mode)
  /*   var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "./log/access.log"),
    { flags: "a" }
  ) */
  // create a rotating write stream
  /*   var accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "./log"),
  }) */
  // setup the logger
  //app.use(morgan("combined", { stream: accessLogStream }))
  app.use(morgan("tiny"))
} else if (process.env.ENV_PROD == "true") {
  //PRODUCTION SETTINGS
}

//*******> static files
app.use(express.static(__dirname + "/public"))
// load assets
//app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
//*******> parse requests of content-type - application/json
app.use(express.json())
//*******> parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//*******> Using session
app.use(
  session({
    secret: uuidv4(),
    resave: true,
    saveUninitialized: true,
  })
)

//*******> Using routes
app.use("/", rootRouter)

//*******> ONLY DEV ENV
if (process.env.ENV_DEV == "true") {
  // USING OTHER APPS
  app.use("/mongo", appMongo)

  // TEST ROUTE
  app.get("/test", (req, res) => {
    //res.json({ message: "Welcome to GC Web TEST API!" })
    res.sendFile("test.html", { root: path.join(__dirname, "./views") })
  })
}

//*******> Start the server
const PORT = parseInt(process.env.MAIN_SERVER_PORT) || 8080
app.listen(PORT, () => {
  if (process.env.DEBUG == "true" || false) {
    console.log(`GC WEb Main App listening on port ${PORT}`)
    console.log("Press Ctrl+C to quit.")
  }
})

module.exports = app
