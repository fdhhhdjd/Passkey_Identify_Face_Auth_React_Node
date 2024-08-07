const express = require("express");
const AsyncHandler = require("../../../utils/asyncHandlerUtils");
const authControllers = require("../../controllers/auth/authControllers");

const router = express.Router();

//* GET
router.get("/logout", AsyncHandler.wrap(authControllers.logout));

//* POST
router.post("/login", AsyncHandler.wrap(authControllers.login));

module.exports = router;
