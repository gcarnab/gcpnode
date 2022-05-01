const express = require("express")
const router = express.Router()

const services = require("../services/mongoRender")
const controller = require("../controllers/mongoController")

/**
 *  @description Root Route
 *  @method GET /
 */
 router.get("/", services.homeRoutes)

/**
 *  @description add users
 *  @method GET /add-user
 */
 router.get("/add-user", services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
 router.get("/update-user", services.update_user)

// API
router.post("/users", controller.create)
router.get("/users", controller.find)
router.put("/mongo/users/:id", controller.update)
router.delete("/mongo/users/:id", controller.delete)

module.exports = router
