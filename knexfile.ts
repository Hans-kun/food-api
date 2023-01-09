import type { Knex } from 'knex';
import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3',
  //   },
  // },

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
      // stub: './src/database/migration.stub',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/database/seeds',
      // stub: './src/database/seed.stub',
    },
    ...knexSnakeCaseMappers(),
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: process.env.DB_Name,
  //     user: process.env.DB_USERNAME,
  //     password: process.env.PASSWORD,
  //   },
  //   migrations: {
  //     directory: './src/database/migrations',
  //     stub: './src/database/migration.stub',
  //     tableName: 'knex_migrations',
  //   },
  //   seeds: {
  //     directory: './src/database/seeds',
  //     stub: './src/database/seed.stub',
  //   },
  //   // pool: {
  //   //   min: 2,
  //   //   max: 10,
  //   // },
  // },
};

module.exports = config;
