const express = require("express");
const AsyncHandler = require("../../../utils/asyncHandlerUtils");
const passkeyControllers = require("../../controllers/passkey/passkeyControllers");

const router = express.Router();

//* POST
router.post(
  "/register-passkey",
  AsyncHandler.wrap(passkeyControllers.registerPasskey)
);

module.exports = router;
