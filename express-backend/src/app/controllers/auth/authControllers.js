const { Ok } = require("../../../cors/success.response");
const AuthServices = require("../../services/authServices");

class AuthControllers {
  async login(req, res) {
    new Ok({
      metadata: await AuthServices.login(req.body),
    }).send(res);
  }

  async logout(req, res) {
    new Ok({
      metadata: await AuthServices.logout(req),
    }).send(res);
  }
}

module.exports = new AuthControllers();
