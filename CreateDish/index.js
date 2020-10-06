/**
 * File: CreateDish/index.js
 * Description: file responsible for creating a new 'Dish'
 * Date: 11/16/2019
 * Author: Glaucia Lemos (@glaucia86)
 */

const createMongoClient = require("../shared/mongo");

module.exports = async function (context, req) {
  const dish = req.body || {};

  if (Object.keys(dish).length === 0 && dish.constructor === Object) {
    context.res = {
      status: 400,
      body: "Dish data is required! ",
    };
    return
  }

  

  const { db, connection } = await createMongoClient();

  const Dishes = db.collection("dishes");

  try {
    const dishes = await Dishes.insertOne(dish);
    connection.close();

    context.res = {
      status: 201,
      body: dishes.ops[0],
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating a new Dish",
    };
  }
};
