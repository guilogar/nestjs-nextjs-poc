import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import controllers from './controllers/controllers.module';
import services from './services/services.module';

@Module({
  imports: [],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule {}
