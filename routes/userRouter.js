const express = require("express")
const router = express.Router()
const crudController = require("../controllers/userController")

router.get("/", crudController.index)
router.get("/create", crudController.create)
router.post("/", crudController.store)
router.get("/:id/edit", crudController.edit)
router.put("/:id", crudController.update)
router.delete("/:id", crudController.destroy)

module.exports = router
