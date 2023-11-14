import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './item.entity';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(InvoiceItem) private cashierRepo: Repository<InvoiceItem>,
    private readonly reflector: Reflector,
  ) {}

  async createInvoiceItem(
    name: string,
    quantity: number,
    price: number,
  ): Promise<InvoiceItem> {
    const taxes = this.reflector.get<number>(
      'tax',
      ItemService.prototype.createInvoiceItem,
    );
    const discount = this.reflector.get<number>(
      'discount',
      ItemService.prototype.createInvoiceItem,
    );
    const newPrice = (price - discount) * (1 - taxes);
    const cashier = this.cashierRepo.create({
      name,
      quantity,
      price: newPrice,
    });

    return this.cashierRepo.save(cashier);
  }

  async getAllItemsBilled(): Promise<InvoiceItem[]> {
    const cashiers = this.cashierRepo.find();

    return cashiers;
  }
}
