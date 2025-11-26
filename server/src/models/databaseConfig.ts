import { MongoClient, ServerApiVersion } from "mongodb";
import { DatabaseURL } from "../constants";

export const client = new MongoClient(DatabaseURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db();
