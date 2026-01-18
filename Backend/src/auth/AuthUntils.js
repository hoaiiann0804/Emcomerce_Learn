"use strict";

const jwt = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, praviteKey) => {
  try {
    //accesstoken
    // luu y pravite key khong luu vao databse chi xay ra dien ra 1 lan khi sign in mot lan no se day qua brower
    const accessToken = await jwt.sign(payload, praviteKey, {
      //   algorithm: "RS256", // danh cho level cao
      expiresIn: "2 days",
    });
    const refreshToken = await jwt.sign(payload, praviteKey, {
      //   algorithm: "RS256", //danh cho level cao
      expiresIn: "7 days",
    });

    // verify
    jwt.verify(accessToken, publicKey, (err, decode) => {
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
