import { Knex } from 'knex';
import { UserModel } from '../models/users.model';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries

  await UserModel.query(knex).insert([
    { name: 'Frank', email: 'frank@gmail.com', roles: 'admin' },
    { name: 'Chester', email: 'chester@gmail.com', roles: 'customer' },
    { name: 'Martial', email: 'chester@gmail.com', roles: 'customer' },
  ]);
}
