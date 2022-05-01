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
//var engines = require("consolidate")

// DB
//var myConnection = require("express-myconnection")
var mysql = require("mysql")
var mongoose = require("mongoose")
var jsonServer = require("json-server")

//LOGGING
var morgan = require("morgan")
var fs = require("fs")
var rfs = require("rotating-file-stream")

//ENVIRONMENT VARIABLES
require("dotenv").config()
console.log("######################################")
console.log("process.env.NODE_ENV= " + process.env.NODE_ENV)
console.log("process.env.DB_USE= " + process.env.DB_USE)
console.log("process.env.DB_TYPE= " + process.env.DB_TYPE)
console.log("######################################")

// Creating express server
const app = express()

if (process.env.DB_USE_MYSQL == "true") {
  var connection = require("./database/db")
  // connecting route to Mysql DB
  app.use(function (req, res, next) {
    req.conn = connection
    next()
  })
}
if (process.env.DB_USE_MONGO == "true") {
  // mongodb connection
  const connectDB = require("./database/db_mongo")
  //connectDB()

  /*   mongoose.connect(
    process.env.DB_MONGO_URI,
    { useNewUrlParser: true },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.")
      } else {
        console.log("##### Error in MongoDB connection : " + err)
      }
    }
  ) */
}
if (process.env.DB_USE_JSON == "true") {
  // JSON Server
  app.use("/json", jsonServer.router("./database/db.json"))
}
// assign the engine to the file
/* app.engine("ejs", engines.ejs)
app.engine("pug", engines.pug) */

// SETTING the default extension
//app.set("view engine", "pug")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// importing routes

var rootRouter = require("./routes/index")

//var crudRouter = require("./routes/crudRouter")
//var mongoRouter = require("./routes/mongoRouter")

//ACTIONS FOR DEVELOPMENT MODE
if (process.env.NODE_ENV == "development") {
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
} else if (process.env.NODE_ENV == "production") {
  //PRODUCTION SETTINGS
}

// static files
app.use(express.static(__dirname + "/public"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//Using session
app.use(
  session({
    secret: uuidv4(),
    resave: true,
    saveUninitialized: true,
  })
)

// Using routes
app.use("/", rootRouter)
app.use("/mongo", require("./routes/mongoRouter"))

// TEST ROUTE
app.get("/test", (req, res) => {
  //res.json({ message: "Welcome to GC Web TEST API!" })
  res.sendFile("test.html", { root: path.join(__dirname, "./views") })
})

// Start the server
console.log(process.env.SERVERPORT)
const PORT = parseInt(process.env.SERVERPORT) || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log("Press Ctrl+C to quit.")
})

module.exports = app
