import { Injectable } from '@nestjs/common';
import { Cashier } from './cashier.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CashierService {
  constructor(
    @InjectRepository(Cashier) private cashierRepo: Repository<Cashier>,
  ) {}

  async createCashier(name: string, email?: string): Promise<Cashier> {
    const cashier = this.cashierRepo.create({ name, email });

    return this.cashierRepo.save(cashier);
  }

  async getAllCashiers(): Promise<Cashier[]> {
    const cashiers = this.cashierRepo.find();

    return cashiers;
  }
}
