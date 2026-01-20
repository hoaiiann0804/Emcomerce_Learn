const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

console.log("Process", process.env);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev")); //  su dung cho Dev
// app.use(morgan("combined")); //su dung cho production
// morgan("common"); // giống với combined nhưng  ko có resource (postman)
// app.use(morgan("short")); // trả vè thời gian phản hồi và method
// app.use(morgan("tiny")); // tra ve method va thoi gian phan hoi

app.use(helmet());
app.use(compression());

//init db
// require('../src/dbs/init.mongodb.lv0')
require("../src/dbs/init.mongodb");
// const { checkOverLoad } = require("../src/helpers/check.connect");
// checkOverLoad();
app.use("/", require("./routes"));
//handle error

//ham quan ly middleware chi co 3 tham so
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
//ham quan ly loi 4 tham so
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || 'Internal Server Error' 
  });
});
 
module.exports = app;
