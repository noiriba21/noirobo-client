import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

const globalForMongo = globalThis;
const client = globalForMongo.__mongoClient ?? new MongoClient(uri);
if (!globalForMongo.__mongoClient) {
  globalForMongo.__mongoClient = client;
}

const db = client.db("noiroboDB");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
