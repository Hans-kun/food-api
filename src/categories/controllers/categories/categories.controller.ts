import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateAddonCategoryDto } from 'src/categories/AddonCategory.dto';
import { CategoriesService } from 'src/categories/services/categories/categories.service';

@Controller('brands/:brandId/addon-categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Body() createAddonCategoryDto: CreateAddonCategoryDto,
  ) {
    return this.categoriesService.create(brandId, createAddonCategoryDto);
  }
}
