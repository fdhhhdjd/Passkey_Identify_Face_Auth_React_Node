"use strict";

const PasskeyHelpers = require("../helpers/passkeyHelpers");
const pgInit = require("../inits/pgInit");

class Globals {
  static async init() {
    //* PASSKEY
    await PasskeyHelpers.initialize();

    //* PG
    await pgInit.connect();
  }
}

Globals.init();
