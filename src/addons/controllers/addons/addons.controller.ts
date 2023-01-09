import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddonsService } from 'src/addons/services/addons/addons.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { UpdateAddonDto } from 'src/addons/updateAddon.dto';
import { Role } from 'src/auth/roles/roles.enum';

@Controller('brands/:brandId/addons')
@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(JwtAuthGuard)
export class AddonsController {
  constructor(private addonsService: AddonsService) {}

  @Post()
  async create(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.create(brandId, updateAddonDto);
  }

  @Get()
  async findAll(@Param('brandId', new ParseIntPipe()) brandId: number) {
    return this.addonsService.findAll(brandId);
  }

  @Get(':addonId')
  async findOne(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    const addon = await this.addonsService.findOne(brandId, addonId);
    return addon;
  }

  @Patch(':addonId')
  async edit(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.update(brandId, addonId, updateAddonDto);
  }

  @Delete(':addonId')
  async delete(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    return this.addonsService.delete(brandId, addonId);
  }
}
