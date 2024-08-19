const { Ok, Created } = require("../../../cors/success.response");
const IdentifyFaceServices = require("../../services/identifyFaceServices");

class IdentifyFaceControllers {
  async login(req, res) {
    new Ok({
      metadata: await IdentifyFaceServices.login(req, res),
    }).send(res);
  }

  async register(req, res) {
    new Created({
      metadata: await IdentifyFaceServices.register(req, res),
    }).send(res);
  }
}

module.exports = new IdentifyFaceControllers();
