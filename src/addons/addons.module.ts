import { Module, Global } from '@nestjs/common';
import { AddonsController } from './controllers/addons/addons.controller';
import { AddonsService } from './services/addons/addons.service';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [AddonsController],
  providers: [AddonsService],
})
export class AddonsModule {}
