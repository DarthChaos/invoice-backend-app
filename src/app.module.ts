import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfiguration from './config/DatabaseConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoryModule } from './factory/factory.module';
import { Cashier } from './cashier/cashier.entity';
import { Customer } from './customer/customer.entity';
import { CashierModule } from './cashier/cashier.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [new DatabaseConfiguration().getPostgresVars()],
      envFilePath: '.dev.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: +configService.get('postgres.port'),
        username: configService.get('postgres.role'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.db'),
        entities: [Cashier, Customer],
        synchronize: true,
      }),
    }),
    FactoryModule,
    CashierModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
