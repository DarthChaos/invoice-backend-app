import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './cashier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cashier])],
  providers: [CashierService],
  controllers: [CashierController],
})
export class CashierModule {}
