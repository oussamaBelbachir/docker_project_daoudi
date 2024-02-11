const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 ");
  console.log(err.name);
  console.log(err.message);
  console.log("========> uncaught Exception".toUpperCase());
  console.log("💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 ");
  process.exit(1);
});
dotenv.config({ path: "./.env" });
const app = require("./app");

// i'm not using mongo docker image
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection successful ✅ ✅ ✅");
  })
  .catch((err) => {
    console.log("Err ==> ", err);
  });

const port = process.env.PORT || 8001;
const server = app.listen(port, () => {
  console.log(`I'm running on port ${port} ✅ ✅ ✅`);
});

process.on("unhandledRejection", (err) => {
  console.log("💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 ");
  console.log(err.name);
  console.log(err.message);
  console.log("========> unhandled Rejection".toUpperCase());
  console.log("💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 💥 ");

  // server.close(() => {
  process.exit(1);
  // });
});
