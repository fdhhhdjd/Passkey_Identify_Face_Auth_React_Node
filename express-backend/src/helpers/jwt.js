const jose = require("jose");

class JwtHelpers {
  static async extractUserID(token) {
    try {
      const payload = jose.decodeJwt(token ?? "");

      const userID = payload.sub;

      return userID;
    } catch (error) {
      console.error("Lỗi giải mã JWT:", error);
      return null;
    }
  }
}

module.exports = JwtHelpers;
