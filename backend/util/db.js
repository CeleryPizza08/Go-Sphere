const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(
      'mongodb+srv://wong1833:Wongzc_1833@cluster0.msgv2xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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
