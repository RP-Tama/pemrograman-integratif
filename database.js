const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/mydb';

// Create a new MongoClient
const client = new MongoClient(uri);

async function connect() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Select the database
    const db = client.db('mydb');

    return db;
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
}

module.exports = connect;
