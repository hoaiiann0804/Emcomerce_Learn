"use strict";

const { filter } = require("lodash");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      //LEVEL 0
      // const publicKeyString = publicKey.toString();
      // publickey dang su dung thuat toan bat doi xung chu cho nen buffer chua dc hash thi chuye ve tostrING de luu vao database
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey, // level don gian
      // });
      // return tokens ? tokens.publicKey : null;

      //LEVEL XXX
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
        options = {
          upsert: true,
          new: true,
        };
      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = KeyTokenService;
