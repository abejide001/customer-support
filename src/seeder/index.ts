import dotenv from "dotenv";
dotenv.config();

import User from "../models/User";
import userData from "../data/users.json";
import "../config/databaseConfig";

(async () => {
  try {
    await Promise.all([User.insertMany(userData)]);
    console.log("data seeded");
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
})();
