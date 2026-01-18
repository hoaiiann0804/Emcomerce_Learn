"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      // publickey dang su dung thuat toan bat doi xung chu cho nen buffer chua dc hash thi chuye ve tostrING de luu vao database
      const tokens = await keytokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return tokens ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = KeyTokenService;
