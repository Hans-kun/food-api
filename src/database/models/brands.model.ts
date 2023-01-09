import { BaseModel } from './base.model';
import { UserModel } from './users.model';
import { Model } from 'objection';
import { AddOnModel } from './addons.model';

export class BrandModel extends BaseModel {
  static tableName = 'brands';

  brandName: string;
  createdAt: Date;
}
