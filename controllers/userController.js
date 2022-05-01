const User = require("../models/userModel")

module.exports = {
  index: function (req, res) {
    User.get(req.conn, function (err, rows) {
      //res.render("pages/tables.ejs", { data: rows, dbuse: dbuse, req })
      res.render("pages/tables.ejs", { data: rows })
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
      res.render("pages/crudEdit.pug", { data: rows[0] })
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
