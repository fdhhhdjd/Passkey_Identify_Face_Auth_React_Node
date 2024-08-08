"use strict";

const PasskeyHelpers = require("../helpers/passkeyHelpers");

class Globals {
  static async init() {
    //* PASSKEY
    await PasskeyHelpers.initialize();
  }
}

Globals.init();
