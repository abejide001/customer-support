import mongoose from "mongoose";

export default (async function dbConfig() {
  try {
    if (process.env.NODE_ENV === "development") {
     await mongoose.connect("mongodb://mongo:27017/fliqpay?retryWrites=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("connected to development database")
      return
    } else {
      await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pgmrh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("connected to production database");
      return
    }
  } catch (err) {
    console.log(err);
  }
})();
