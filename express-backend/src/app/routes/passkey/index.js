const express = require("express");
const AsyncHandler = require("../../../utils/asyncHandlerUtils");
const passkeyControllers = require("../../controllers/passkey/passkeyControllers");
const AuthMiddlewares = require("../../../middlewares/authMiddlewares");

const router = express.Router();

//* MIDDLWARES
router.use(AuthMiddlewares.checkAuth);

//* POST
router.post("/register", AsyncHandler.wrap(passkeyControllers.registerPasskey));

module.exports = router;
