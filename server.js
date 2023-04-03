const grpc = require('@grpc/grpc-js');
const { MongoClient, ObjectId } = require('mongodb');
const dataProto = require('./data_pb');
const { createData, readData, updateData, deleteData } = require('./data.controller');

async function connectToDatabase() {
  const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const DB_NAME = process.env.DB_NAME || 'test';
  const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
  await client.connect();
  console.log(`Connected to MongoDB at ${MONGO_URL}`);
  return client;
}

async function main() {
  const server = new grpc.Server();
  const PORT = process.env.PORT || 50051;
  const dbClient = await connectToDatabase();

  server.addService(dataProto.DataService.service, {
    createData: createData,
    readData: readData,
    updateData: updateData,
    deleteData: deleteData
  });

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    server.start();
  });
}

main();
