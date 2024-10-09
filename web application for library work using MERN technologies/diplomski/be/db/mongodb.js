const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://lukart1121:fEE4r8R02RpRx2fo@cluster0.sraixvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db("application");
  }
  return db;
}

module.exports = { connect };
