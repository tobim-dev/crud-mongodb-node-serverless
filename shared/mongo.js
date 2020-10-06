/**
 * Arquivo: mongo.js
 * Data: 12/04/2019
 * Descrição: file responsible for handling the database connection locally
 * Author: Glaucia Lemos
 */

const { MongoClient } = require("mongodb");

const config = {
  url: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE_URL}/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  dbName: "crud-serverless-mongodb"
};

async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true
  });
  const db = connection.db(config.dbName);
  return {
    connection,
    db
  };
}

module.exports = createConnection;