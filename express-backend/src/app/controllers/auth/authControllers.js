const { Ok } = require("../../../cors/success.response");
const AuthServices = require("../../services/authServices");

class AuthControllers {
  async login(req, res) {
    new Ok({
      metadata: await AuthServices.login(req, res),
    }).send(res);
  }

  async LoginMfaPasskey(req, res) {
    new Ok({
      metadata: await AuthServices.handleMfaLogin(req, res),
    }).send(res);
  }

  async LoginPasskey(req, res) {
    new Ok({
      metadata: await AuthServices.handlePasskeyLogin(req, res),
    }).send(res);
  }

  async logout(req, res) {
    new Ok({
      metadata: await AuthServices.logout(req, res),
    }).send(res);
  }
}

module.exports = new AuthControllers();
