/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const recipesData = require("../seed_data/recipesData");

 exports.seed = async function (knex) {
   // Deletes ALL existing entries
   await knex("recipes").del();
   await knex("recipes").insert(recipesData);
 };
 