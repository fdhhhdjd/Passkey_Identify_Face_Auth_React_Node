"use strict";

const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/passkey", require("./passkey"));
router.use("/identify-face", require("./identify-face"));

module.exports = router;
