const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './crud.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).User;

const client = new userProto.UserService('localhost:5000', grpc.credentials.createInsecure());

function getUser(userId) {
  return new Promise((resolve, reject) => {
    client.getUser({ userId }, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}


function addUser(userId, name, age) {
  return new Promise((resolve, reject) => {
    const user = { userId,   name, age };
    client.addUser(user, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function updateUser(userId, name, age) {
  return new Promise((resolve, reject) => {
    const user = { userId, name, age };
    client.updateUser(user, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    client.deleteUser({ userId }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

async function test() {
  try {
    const user = await getUser(7);
    console.log('getUser:', user);

    const newUser = await addUser(3,'tono', 40);
    console.log('addUser:', newUser);

    const updatedUser = await updateUser(8, 'alex', 17);
    console.log('updateUser:', updatedUser);

    const result = await deleteUser(10);
    console.log('deleteUser:', result);
  } catch (error) {
    console.error(error);
  }
}

test();