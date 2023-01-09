import { Knex } from 'knex';

const tableName = 'addons';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name', 225).notNullable();
    table.text('description').nullable();
    table.double('price').notNullable();
    table.integer('brandId').references('id').inTable('brands');
    table.integer('categoryId').references('id').inTable('addon_categories');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
