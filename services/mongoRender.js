const axios = require("axios")
var path = require("path")

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  var mongoUrl = "http://localhost:" + process.env.SERVERPORT + "/mongo/users"

  axios
    .get("http://localhost:3000/users")
    .then(function (response) {
      //res.render("pages/mongo_index", { users: response.data })
      var myPath = path.join(__dirname + "../views/pages/mongo_index.ejs")
      res.render(myPath)
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.add_user = (req, res) => {
  res.render("../views/pages/mongo_add_user")
}

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/mongo/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("../views/pages/mongo_update_user", { user: userdata.data })
    })
    .catch((err) => {
      res.send(err)
    })
}
