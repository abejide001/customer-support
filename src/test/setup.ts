import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwtSign from "../helpers/token";

declare global {
  var customerSignIn: () => string;
  var agentSignIn: () => string;
  var adminSignIn: () => string;
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "adsfdg";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  if (!mongoose.connection.db) {
    throw new Error("Database not connected");
  }

  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.customerSignIn = () => {
  // Build a JWT payload.  { id, email and customer }
  const payload = {
    id: new mongoose.Types.ObjectId(),
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
    id: new mongoose.Types.ObjectId(),
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
    id: new mongoose.Types.ObjectId(),
    email: "admin@gmail.com",
    role: "admin",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};
