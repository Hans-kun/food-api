import { Module } from '@nestjs/common';
import { AddonsModule } from './addons/addons.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AddonsModule, CategoriesModule, DatabaseModule, AuthModule],
})
export class AppModule {}
