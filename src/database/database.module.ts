import { Global, Module } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { UserModel } from './models/users.model';
import { AddOnModel } from './models/addons.model';
import { BrandModel } from './models/brands.model';
import { CategoriesModel } from './models/categories.model';
// import { Knex } from 'knex';

const models = [AddOnModel, BrandModel, CategoriesModel, UserModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knexcon = knex({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ...knexSnakeCaseMappers(),
      });
      Model.knex(knexcon);
      return knexcon;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
