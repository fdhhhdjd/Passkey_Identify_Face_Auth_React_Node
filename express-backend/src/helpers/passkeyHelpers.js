const dotenv = require("dotenv");
const db = require("../data/dummy/db");
const { BadRequestResponse } = require("../cors/error.response");
const RandomHelper = require("./randomHelper");

dotenv.config();

class PasskeyHelpers {
  constructor() {
    this.passkeyApi = null;
  }

  async initialize() {
    const { tenant } = await import("@teamhanko/passkeys-sdk");
    this.passkeyApi = tenant({
      apiKey: process.env.PASSKEYS_API_SECRET_KEY,
      tenantId: process.env.PASSKEYS_TENANT_ID,
    });
  }

  async startServerPasskeyRegistration(userID) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const user = db.users.find((user) => user.id === userID);

    const createOptions = await this.passkeyApi.registration.initialize({
      userId: user.id,
      displayName: user.fullname,
      username: user.username,
      icon: RandomHelper.generateAvatar(user.fullname),
    });

    return createOptions;
  }

  async finishServerPasskeyRegistration(credential) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    await this.passkeyApi.registration.finalize(credential);
  }

  async startServerPasskeyLogin() {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const options = await this.passkeyApi.login.initialize();
    return options;
  }

  async finishServerPasskeyLogin(options) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const response = await this.passkeyApi.login.finalize(options);
    return response;
  }

  async startMfaRegistration(userID) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const user = db.users.find((user) => user.id === userID);

    const createOptions = await this.passkeyApi
      .user(user.id)
      .mfa.registration.initialize({
        username: user.email || "",
      });

    return createOptions;
  }

  async finishMfaRegistration(userID, credential) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const user = db.users.find((user) => user.id === userID);

    console.log(user, "---", user.id);
    await this.passkeyApi.user(user.id).mfa.registration.finalize(credential);
  }

  async startMfaLogin(userID) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const user = db.users.find((user) => user.id === userID);
    const options = await this.passkeyApi.user(user.id).mfa.login.initialize();
    return options;
  }

  async finishMfaLogin(userID, options) {
    if (!this.passkeyApi) throw new BadRequestResponse();

    const user = db.users.find((user) => user.id === userID);
    const response = await this.passkeyApi
      .user(user.id)
      .mfa.login.finalize(options);
    return response;
  }
}

module.exports = new PasskeyHelpers();
