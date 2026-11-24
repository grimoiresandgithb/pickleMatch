import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient> | undefined;

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo.mongoClientPromise) {
      const client = new MongoClient(uri);
      globalForMongo.mongoClientPromise = client.connect();
    }

    clientPromise = globalForMongo.mongoClientPromise;
  } else if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const client = await clientPromise;

  return client.db(process.env.MONGODB_DB || "picklematch");
}