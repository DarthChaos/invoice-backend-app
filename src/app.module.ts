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
import { ItemModule } from './item/item.module';
import { InvoiceItem } from './item/item.entity';

const dbConn = new DatabaseConfiguration();

dbConn.subscribe({
  next: (newState) => console.log('DB Port:', newState),
  error: (error) => console.error('DB error:', error),
  complete: () => console.log('Connection already complete'),
});

dbConn.getPostgresVars();

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [dbConn.getPostgresVars()],
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
        entities: [Cashier, Customer, InvoiceItem],
        synchronize: true,
      }),
    }),
    FactoryModule,
    CashierModule,
    CustomerModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
