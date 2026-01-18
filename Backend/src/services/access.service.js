const shopModels = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/AuthUntils");
const { getInfoData } = require("../utils");

const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  //viết static cho khỏe
  static SignUp = async ({ name, email, password }) => {
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
        // danh cho level nang cao
        // created praviteKey: tao xong de chon nguoi dung ko luu trong he thong -> sign token
        // ,publicKey: luu trong he thong -> verify Token
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        
        //Public key CryptogGraphy standard

      //level nang cao 
      // const pubilcKeyString = await KeyTokenService.createToken({
      //   userId: newShop._id,
      //   publicKey,
    
      // });
        console.log({ privateKey, publicKey }); //save collection KeyStore
        const keyStore = await KeyTokenService.createToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStore) {
          return {
            code: "xxxx",
            message: "Public key string error",
          };
        }
        // const publicKeyOject = crypto.createPublicKey(publicKeyString);
        // console.log(`publicKeyOject`, publicKeyOject);
        // created token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );
        console.log("Created Token Sucess", tokens);
        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fileds: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxxx",
        message: error.message,
        status: "error",
      };
    }
  };
}
module.exports = AccessService;
