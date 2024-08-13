const express = require("express");
const AsyncHandler = require("../../../utils/asyncHandlerUtils");
const passkeyControllers = require("../../controllers/passkey/passkeyControllers");
const AuthMiddlewares = require("../../../middlewares/authMiddlewares");

const router = express.Router();

//* MIDDLEWARES
router.use(AuthMiddlewares.checkAuth);

//* POST
router.post("/register", AsyncHandler.wrap(passkeyControllers.registerPasskey));
router.post("/mfa/register", AsyncHandler.wrap(passkeyControllers.registerMfa));

module.exports = router;
