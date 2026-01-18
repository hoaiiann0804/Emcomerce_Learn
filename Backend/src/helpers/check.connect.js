const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
const CountConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log("Num of connections", numConnection);
};
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    console.log("Number Activity", numConnection);
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    console.log(`Memory Ussage ${memoryUsage / 1024 / 1024} MB`);
    const maxConnections = numCores * 5;
    console.log("max Connections", maxConnections);
    if (numCores > maxConnections) {
      console.log("Connnection Over Detected");
    }
  }, _SECONDS);
};
module.exports = {
  CountConnect,
  checkOverLoad,
};

// const mongoose = require("mongoose");
// const os = require("os");
// const process = require("process");
// const _SECONDS = 5000;
// // Count Connect : Kiem tra hethong co bao nhieu connect
// const CountConnect = () => {
//   const numConnection = mongoose.connections.length;
//   console.log(`Number of connection ${numConnection}`);
// }

// // check over load: thong bao server qua tai khi connect
// const checkOverLoad = () => {
//   setInterval(() => {
//     const numConnection = mongoose.connections.length;
//     const numCores = os.cpus().length;
//     const memoryUsage = process.memoryUsage().rss;
//     // Example maximum number connection based on number cores
//     console.log("Activity collections", numConnection);
//     const maxConnections = numCores * 5; // gia su may core chiu dung duoc 5 connect  (vi du core trong may la 8 . 8x5=40 cores)
//     console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB `);
//     if (numCores > maxConnections) {
//       console.log("Connection Over detected");
//     }
//   }, _SECONDS); // Monitor every 5 seconds
// };
// module.exports = {
//   CountConnect,
//   checkOverLoad,
// };

// lưu ý những thông số mặc định phải khai báo constant. Tuyệt đối không nhúng thẳng thông số vào code
