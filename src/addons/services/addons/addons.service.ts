import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddOnModel } from 'src/database/models/addons.model';
import { ModelClass } from 'objection';
import { AddonDto } from 'src/addons/addon.dto';
import { UpdateAddonDto } from 'src/addons/updateAddon.dto';
import { CategoriesService } from 'src/categories/services/categories/categories.service';

@Injectable()
export class AddonsService {
  constructor(
    private categoriesService: CategoriesService,
    @Inject('AddOnModel') private modelClass: ModelClass<AddOnModel>,
  ) {}

  async create(brandId: number, createAddonDto: AddonDto) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    console.log(createAddonDto);
    console.log(brandId);
    const categoryId = await this.categoriesService.createOrFind(
      brandId,
      createAddonDto.category,
    );
    const addon = this.modelClass
      .query()
      .insert({
        brandId,
        categoryId: categoryId,
        name: createAddonDto.name,
        price: createAddonDto.price,
        description: createAddonDto.description,
      })
      .returning('*')
      .first();

    return addon;
  }

  async findAll(brandId: number) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    return {
      addons: await this.modelClass
        .query()
        .select('*')
        .where('brandId', brandId),
    };
  }

  async findOne(brandId: number, addonId: number) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    if (!addonId) {
      throw new BadRequestException('id must be sent');
    }
    const addon = await this.modelClass
      .query()
      .select('*')
      .findById(addonId)
      .where('brandId', brandId)
      .first();

    if (!addon) {
      throw new NotFoundException();
    }
    return addon;
  }

  async update(
    brandId: number,
    addonId: number,
    updateAddonDto: UpdateAddonDto,
  ) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    if (!addonId) {
      throw new BadRequestException('addonId missing');
    }

    const categoryId = await this.categoriesService.createOrFind(
      brandId,
      updateAddonDto.category,
    );

    const addon = this.modelClass
      .query()
      .where({ brandId: brandId, id: addonId })
      .patch({
        categoryId: categoryId,
        name: updateAddonDto.name,
        price: updateAddonDto.price,
        description: updateAddonDto.description,
      })
      .returning('*')
      .first();

    if (!addon) {
      throw new NotFoundException();
    }
    return addon;
  }

  async delete(brandId: number, addonId: number) {
    if (!brandId) {
      throw new BadRequestException('brandId missing');
    }
    if (!addonId) {
      throw new BadRequestException('addonId missing');
    }

    if (!addonId) {
      throw new NotFoundException();
    }
    const addon = await this.modelClass
      .query()
      .where({ brandId: brandId, id: addonId })
      .delete()
      .returning('*')
      .first();

    return addon;
  }
}
