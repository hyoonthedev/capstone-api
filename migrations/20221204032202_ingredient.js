/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary();
    table.string("ingredient_name").notNullable();
    table.string("category").notNullable();
    table.string("expiry").notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("ingredients");
};
