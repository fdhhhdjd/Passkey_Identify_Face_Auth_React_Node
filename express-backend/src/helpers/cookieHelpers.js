const _ = require("lodash");

const appConstants = require("../constants/appConstants");
const timeConstants = require("../constants/timeConstants");

class CookieHelpers {
  static getTokenByCookie(req, { key }) {
    const resultCookie = req.cookies[key];

    if (_.isEmpty(resultCookie) || _.isNull(resultCookie)) {
      return null;
    }

    return resultCookie;
  }

  static clearCookieByKey(res, { key }) {
    return res.clearCookie(key);
  }

  static saveCookie(res, key, value, time = timeConstants._1_DAY) {
    const option = {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === appConstants.NODE_APP[0] ? false : true,
      secure: process.env.NODE_ENV === appConstants.NODE_APP[0] ? false : true,
      maxAge: time,
      // partitioned: true,
    };

    res.cookie(key, value, option);
  }
}

module.exports = CookieHelpers;
