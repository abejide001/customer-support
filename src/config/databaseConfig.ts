import mongoose from "mongoose";

export default (async function dbConfig() {
  try {
    if (process.env.NODE_ENV === "development") {
      await mongoose.connect("mongodb://localhost:27017/customer-support");
      console.log("connected to development database");
      return;
    } else {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pgowv0z.mongodb.net/?appName=${process.env.APP_NAME}`
      );
      console.log("connected to production database");
      return;
    }
  } catch (err) {
    console.log(err);
  }
})();
