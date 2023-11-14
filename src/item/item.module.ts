import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItem])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
