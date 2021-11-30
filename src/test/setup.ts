import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwtSign from "../helpers/token";

declare global {
      var customerSignIn: () => string
      var agentSignIn: () => string
      var adminSignIn: () => string
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "adsfdg";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });
});

global.customerSignIn = () => {
  // Build a JWT payload.  { id, email and customer }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    role: "customer",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};

global.agentSignIn = () => {
  // Build a JWT payload.  { id, email, and role }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "agent@gmail.com",
    role: "agent",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};

global.adminSignIn = () => {
  // Build a JWT payload.  { id, email, and role }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "admin@gmail.com",
    role: "admin",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};
