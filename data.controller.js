const connect = require('./database');

async function createData(call, callback) {
    try {
      const db = await connect();
  
      const requestData = call.request;
  const newData = await database.create(requestData);
  callback(null, {data: newData});
  
      callback(null, { success: true });
    } catch (err) {
      console.log(err.stack);
      callback(err);
    }
  }

  async function deleteData(call, callback) {
    try {
      const db = await connect();
  
      const requestData = call.request;
      await database.delete(requestData.id);
      callback(null, {});
  
      callback(null, { success: true });
    } catch (err) {
      console.log(err.stack);
      callback(err);
    }
  }

  async function readData(call, callback) {
    try {
      const db = await connect();
  
      const requestData = call.request;
      const retrievedData = await database.read(requestData.id);
      callback(null, {data: retrievedData});
  
      callback(null, { success: true });
    } catch (err) {
      console.log(err.stack);
      callback(err);
    }
  }

  async function updateData(call, callback) {
    try {
      const db = await connect();
  
      const requestData = call.request;
  const updatedData = await database.update(requestData);
  callback(null, {data: updatedData});
  
      callback(null, { success: true });
    } catch (err) {
      console.log(err.stack);
      callback(err);
    }
  }


module.exports = {
  createData,
  readData,
  updateData,
  deleteData
};
