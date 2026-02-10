'use strict';

async function up(knex) {
  // Add productAvailibility and size columns to the products table
  await knex.schema.table('products', table => {
    // Add productAvailibility column (boolean, defaults to true)
    table.boolean('productAvailibility').defaultTo(true);
    
    // Add size column (string, nullable)
    table.string('size').nullable();
  });
}

module.exports = { up }; 