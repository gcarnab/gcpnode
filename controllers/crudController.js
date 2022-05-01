const User = require("../models/userModel")

//READING CONFIGURATION VARIABLES
var dbuseFlag = process.env.DB_USE
var mysqlFlag = process.env.DB_USE_MYSQL
var jsonFlag = process.env.DB_USE_JSON
var mongoFlag = process.env.DB_USE_MONGO

module.exports = {
  index: function (req, res) {
    User.get(req.conn, function (err, rows) {
      res.render("pages/crudIndex.pug", { data: rows, message : "", dbuseFlag : dbuseFlag , req })
    })
  },
  create: function (req, res) {
    res.render("pages/crudCreate.pug")
  },

  store: function (req, res) {
    User.create(req.conn, req.body, function (err) {
      res.redirect("/crud")
    })
  },

  edit: function (req, res) {
    User.getById(req.conn, req.params.id, function (err, rows) {
      res.render("pages/crudEdit.pug", { data: rows[0], req })
    })
  },

  update: function (req, res) {
    User.update(req.conn, req.body, req.params.id, function (err) {
      res.redirect("/crud")
    })
  },

  destroy: function (req, res) {
    User.destroy(req.conn, req.params.id, function (err) {
      res.redirect("/crud")
    })
  },
}
