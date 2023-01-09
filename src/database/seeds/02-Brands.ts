import { Knex } from 'knex';
import { BrandModel } from '../models/brands.model';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('brands').del();

  // Inserts seed entries
  await BrandModel.query(knex).insert([
    { brandName: 'ColdStone' },
    { brandName: 'Dominos' },
    { brandName: 'Mega Chicken' },
  ]);
}
