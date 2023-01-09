import { BaseModel } from './base.model';
import { CategoriesModel } from './categories.model';
import { BrandModel } from './brands.model';
import { Model } from 'objection';

export class AddOnModel extends BaseModel {
  static tableName = 'addons';

  name: string;
  description: string;
  price: number;
  brandId: number;
  categoryId: number;
  createdAt: Date;

  category: CategoriesModel;
  brand: BrandModel;

  static relationMappings = {
    brand: {
      modelClass: `${__dirname}/brands.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.brandId',
        to: 'brand.id',
      },
    },

    category: {
      modelClass: `${__dirname}/categories.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.categoryId',
        to: 'addon-categories.id',
      },
    },
  };
  addon: any;
}
