const router = require("express").Router();
const controller = require("./movies-theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");


router.route("/:movieTheaterId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);


module.exports = router;