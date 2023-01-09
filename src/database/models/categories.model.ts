import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BrandModel } from './brands.model';

export class CategoriesModel extends BaseModel {
  static tableName = 'addon_categories';
  brandId: number;
  name: string;
  createdAt: Date;

  brand: BrandModel;

  static relationMappings = {
    brand: {
      modelClass: `${__dirname}/brands.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addon-categories.brandId',
        to: 'brands.id',
      },
    },
  };
}
