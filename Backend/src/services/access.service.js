const shopModels = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  //viết static cho khỏe
  static Signup = async ({ name, email, password }) => {
    try {
      const existShop = await shopModels.findOne({ email }).lean();
      // lean : trả về 1 opject JS thuần túy (query nhanh)
      if (existShop) {
        return {
          code: "xxxx",
          message: "Shop Already Registered",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModels.create({
        name,
        email,
        password: passwordHash,
        roles: [RolesShop.SHOP],
      });
      if (newShop) {
        // created praviteKey: tao xong de chon nguoi dung ko luu trong he thong -> sign token
        // ,publicKey: luu trong he thong -> verify Token
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log({ privateKey, publicKey }); //save collection KeyStore
        const publicKeyString = await KeyTokenService.createToken({
          userId: newShop._id,
          publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "Public key sting error",
          };
        }
      }
    } catch (error) {
      return {
        code: "xxxx",
        message: error.message,
        status: "error",
      };
    }
  };
}
module.exports = new AccessService();
