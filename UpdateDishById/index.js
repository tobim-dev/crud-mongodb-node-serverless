// @ts-nocheck
/**
 * File: UpdateDishById/index.js
 * Description: file responsible for update a 'Dish' by Id
 * Data: 11/16/2019
 * Author: Glaucia Lemos (@glaucia86)
 */

const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
  const { id } = req.params
  const dish = req.body || {}

  if (!id || !dish) {
    context.res = {
      status: 400,
      body: 'Fields are required'
    }

    return
  }

  const { db, connection } = await createMongoClient()
  const Dishes = db.collection('dishes')

  try {
    const dishes = await Dishes.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: dish }
    )

    connection.close()

    context.res = {
      status: 200,
      body: dishes
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error updating a Dish'
    }
  }
}