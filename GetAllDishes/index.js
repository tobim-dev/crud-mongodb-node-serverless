/**
 * File: GetAllDishes/index.js
 * Description: file responsible for list all 'Dishes'
 * Data: 11/16/2019
 * Author: Glaucia Lemos (@glaucia86)
 */

const createMongoClient = require('../shared/mongo')

module.exports = async context => {
  const { db, connection } = await createMongoClient()

  const Dishes = db.collection('dishes')
  const res = await Dishes.find({})
  const body = await res.toArray()

  connection.close()

  context.res = {
    status: 200,
    body
  }
}