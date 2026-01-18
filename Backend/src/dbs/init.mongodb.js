const mongoose = require("mongoose");
const { CountConnect } = require("../helpers/check.connect");
const config = require("../configs/config.mongodb");
//level 0
const {
    db: { host, port, name },
  } = config;
const StringConnection = `mongodb://${host}:${port}/${name}`;
// console.log('StringConnection',StringConnection)
class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(StringConnection, {
        maxPoolSize: 50,
      })
      .then((_) => console.log("Database Connect Pro", CountConnect()))
      .catch((err) => console.log("Error Connected"));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const InstanceMongoDB = Database.getInstance();
module.exports = InstanceMongoDB;
