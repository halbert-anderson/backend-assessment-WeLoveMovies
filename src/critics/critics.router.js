const router = require("express").Router();
const controller = require("./critics.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");


router.route("/:criticId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);


module.exports = router;