"use strict";

const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //accesstoken
    // luu y pravite key khong luu vao databse chi xay ra dien ra 1 lan khi sign in mot lan no se day qua brower
    const accessToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256", // danh cho level cao
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256", //danh cho level cao
      expiresIn: "7 days",
    });

    // verify
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify:::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};

module.exports = { createTokenPair };
