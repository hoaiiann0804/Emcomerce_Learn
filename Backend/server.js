const app = require("./src/app");

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Welcome to my project ", PORT);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log("Exit Sever"));
// });

// NETWORK NODEJS
