const { Created } = require("../../../cors/success.response");
const PasskeyServices = require("../../services/passkeyService");

class PasskeyControllers {
  async registerPasskey(req, res) {
    new Created({
      metadata: await PasskeyServices.registerPasskey(req, res),
    }).send(res);
  }

  async registerMfa(req, res) {
    new Created({
      metadata: await PasskeyServices.handleMfaRegister(req, res),
    }).send(res);
  }
}

module.exports = new PasskeyControllers();
