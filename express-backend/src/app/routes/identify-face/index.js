const express = require("express");
const AsyncHandler = require("../../../utils/asyncHandlerUtils");
const identifyFaceControllers = require("../../controllers/identify-face/identifyFaceControllers");

const router = express.Router();

//* POST
router.post("/login", AsyncHandler.wrap(identifyFaceControllers.login));

router.post("/register", AsyncHandler.wrap(identifyFaceControllers.register));

module.exports = router;
