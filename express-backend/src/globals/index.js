"use strict";
const faceapi = require("@vladmandic/face-api");

const PasskeyHelpers = require("../helpers/passkeyHelpers");
const pgInit = require("../inits/pgInit");

class Globals {
  static async init() {
    //* PASSKEY
    await PasskeyHelpers.initialize();

    //* PG
    await pgInit.connect();

    //* FACE API
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/data/models");
      await faceapi.nets.faceRecognitionNet.loadFromDisk("./src/data/models");
      await faceapi.nets.faceLandmark68Net.loadFromDisk("./src/data//models");
    };

    loadModels();
  }
}

Globals.init();
