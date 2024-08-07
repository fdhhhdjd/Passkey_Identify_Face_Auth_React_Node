"use strict";

class AsyncHandler {
  static wrap(fn) {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = AsyncHandler;
