const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./data.proto');
const dataProto = grpc.loadPackageDefinition(packageDefinition).Data;

const client = new dataProto.DataService('localhost:50051', grpc.credentials.createInsecure());

function createData() {
  const data = {
    id: '123',
    name: 'John Doe',
    email: 'johndoe@example.com'
  };
  client.createData(data, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
}

function readData() {
  const id = '123';
  client.readData({ id }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
}

function updateData() {
  const data = {
    id: '123',
    name: 'John Smith',
    email: 'johnsmith@example.com'
  };
  client.updateData(data, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
}

function deleteData() {
  const id = '123';
  client.deleteData({ id }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
}

createData();
readData();
updateData();
deleteData();
