const axios = require("axios")

var dbuseFlag = process.env.DB_USE
var mysqlFlag = process.env.DB_USE_MYSQL
var jsonFlag = process.env.DB_USE_JSON
var mongoFlag = process.env.DB_USE_MONGO

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:8080/mongo/api/users")
    .then(function (response) {
      res.render("pages/mongo_index.ejs", {
        users: response.data,
        message: "UNDEFINED",
        dbuseFlag: dbuseFlag,
        mysqlFlag: mysqlFlag,
        jsonFlag: jsonFlag,
        mongoFlag: mongoFlag,
        req,
      })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.add_user = (req, res) => {
  res.render("pages/mongo_add_user.ejs", {
    message: "UNDEFINED",
    dbuseFlag: dbuseFlag,
    mysqlFlag: mysqlFlag,
    jsonFlag: jsonFlag,
    mongoFlag: mongoFlag,
    req,
  })
}

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:8080/mongo/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("pages/mongo_update_user.ejs", {
        user: userdata.data,
        message: "UNDEFINED",
        dbuseFlag: dbuseFlag,
        mysqlFlag: mysqlFlag,
        jsonFlag: jsonFlag,
        mongoFlag: mongoFlag,
        req,
      })
    })
    .catch((err) => {
      res.send(err)
    })
}
