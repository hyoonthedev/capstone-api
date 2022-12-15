/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("recipes", (table) => {
        table.uuid("id").primary();
        table.string("recipe_name").notNullable();
        table.string("cuisine").notNullable();
        table.string("servings").notNullable();
        table.string("total_cook_time").notNullable();
        table.string("image_url").notNullable();
        table.string("ingredients_line", 4000).notNullable();
        table.string("ingredients_base", 4000).notNullable();
        table.string("instructions", 4000).notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("recipes");
};