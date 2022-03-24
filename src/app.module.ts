import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

const cookieSession = require('cookie-session'); // eslint-disable-line @typescript-eslint/no-var-requires

@Module({
  controllers: [AppController],
  imports: [
    ReportsModule,
    TypeOrmModule.forRoot({
      database: 'db.sqlite',
      entities: [Report, User],
      synchronize: true,
      type: 'sqlite',
    }),
    UsersModule,
  ],
  providers: [AppService, { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['asdf'] })).forRoutes('*');
  }
}
