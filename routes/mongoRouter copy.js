const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const UserModel = mongoose.model("User")

/* const services = require("../services/mongoRender")
const controller = require("../controllers/mongoController") */

//const mongoUserModel = require("../models/mongoUserModel")

/*  router.get("/", services.homeRoutes)
 router.get("/add-user", services.add_user)
 router.get("/update-user", services.update_user) */

router.get("/", (req, res) => {
  res.send("MONGO USER MANAGEMENT!")
})

router.get("/list", (req, res) => {
  UserModel.find((err, users) => {
    if (!err) {
      res.render("pages/mongo_index.ejs", {
        users: users,
      })
    } else {
      console.log("Error in retrieving users list :" + err)
    }
  })
})

// API
/* router.post("/users", controller.create)
router.get("/users", controller.find)
router.put("/mongo/users/:id", controller.update)
router.delete("/mongo/users/:id", controller.delete) */

module.exports = router
