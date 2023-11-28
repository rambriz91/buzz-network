const connection = require("../config/connection");
const User = require("../models/User");
const { userData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [];
  await User.collection.insertMany(userData);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
