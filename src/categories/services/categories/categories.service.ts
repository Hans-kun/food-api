import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateAddonCategoryDto } from 'src/categories/AddonCategory.dto';
import { CategoriesModel } from 'src/database/models/categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoriesModel') private modelClass: ModelClass<CategoriesModel>,
  ) {}

  async create(
    brandId: number,
    createAddonCategoryDto: CreateAddonCategoryDto,
  ) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    return this.modelClass
      .query()
      .insert({ brandId, name: createAddonCategoryDto.name })
      .returning('*');
  }

  async createOrFind(brandId: number, category?: string) {
    if (category.length === 0) return null;

    const categoryId = await this.modelClass
      .query()
      .select('id')
      .where({
        brandId,
        name: category,
      })
      .first();

    return categoryId === undefined
      ? (
          await this.modelClass
            .query()
            .insert({ brandId, name: category })
            .returning('id')
            .first()
        ).id
      : categoryId.id;
  }
}
