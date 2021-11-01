import {
  Module, NestModule, RequestMethod, MiddlewareConsumer
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Middleware } from './middleware/generic.middleware';

import controllers from './controllers/controllers.module';
import services from './services/services.module';
import entities from './entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      logging: true,
      logger: 'debug',
      entities: entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes({
      path: 'users', method: RequestMethod.ALL
    });
  }
}
