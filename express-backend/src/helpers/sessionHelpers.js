class SessionHelpers {
  static sessionIdToUserMap = new Map();
  static tempSessionIdToUserMap = new Map();

  static setUser(sessionId, user) {
    this.sessionIdToUserMap.set(sessionId, user);
  }

  static getUser(sessionId) {
    return this.sessionIdToUserMap.get(sessionId);
  }

  static clearUserSession(sessionId) {
    this.sessionIdToUserMap.delete(sessionId);
  }

  static setUserTempSession(tempSessionId, user) {
    this.tempSessionIdToUserMap.set(tempSessionId, user);
  }

  static getUserFromTempSession(tempSessionId) {
    return this.tempSessionIdToUserMap.get(tempSessionId);
  }

  static clearTempSession(tempSessionId) {
    this.tempSessionIdToUserMap.delete(tempSessionId);
  }
}

module.exports = SessionHelpers;
