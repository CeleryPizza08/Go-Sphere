const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(
      ''
    )
    .then((client) => {
      console.log('connected');
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (db) {
    return db;
  }
};

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
