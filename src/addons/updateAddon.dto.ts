import { PartialType } from '@nestjs/mapped-types';
import { AddonDto } from './addon.dto';

export class UpdateAddonDto extends PartialType(AddonDto) {
  name: string;
  description: string;
  price: number;
  category?: string;
}
