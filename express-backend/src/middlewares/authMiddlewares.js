const cookieConstants = require("../constants/cookieConstants");
const { UnauthorizedError } = require("../cors/error.response");
const SessionHelpers = require("../helpers/sessionHelpers");

class AuthMiddlewares {
  static async checkAuth(req, __, next) {
    try {
      const sessionId = req.cookies[cookieConstants.LOGIN];

      console.log(sessionId);

      if (!sessionId) {
        next(new UnauthorizedError());
      }

      const user = SessionHelpers.getUser(sessionId);

      if (!user) {
        next(new UnauthorizedError());
      }

      req.user = user;

      next();
    } catch (error) {
      next(new UnauthorizedError());
    }
  }
}

module.exports = AuthMiddlewares;
