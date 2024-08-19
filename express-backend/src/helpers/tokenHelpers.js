const jwt = require("jsonwebtoken");

class TokenHelpers {
  static generateToken(user) {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}

module.exports = TokenHelpers;
