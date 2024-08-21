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

  static saveCookie(res, key, value, time = timeConstants._1_DAY * 30) {
    const headerValue =
      appConstants.NODE_APP[0] === process.env.NODE_ENV
        ? "localhost"
        : res.headers["x-forwarded-host"];

    const headerArray = Array.isArray(headerValue)
      ? headerValue
      : [headerValue];
    const headerParts = headerArray[0]?.split(":");

    const option = {
      httpOnly:
        process.env.NODE_ENV === appConstants.NODE_APP[0] ? false : true,
      sameSite: "None",
      secure: true,
      maxAge: time,
      domain:
        process.env.NODE_ENV === appConstants.NODE_APP[0]
          ? "localhost"
          : headerParts[0],
      partitioned: true,
    };

    res.cookie(key, value, option);
  }
}

module.exports = CookieHelpers;
