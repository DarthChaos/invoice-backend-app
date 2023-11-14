import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async createCustomer(name: string, email?: string): Promise<Customer> {
    const cashier = this.customerRepo.create({ name, email });

    return cashier;
  }

  async getAllCustomers(): Promise<Customer[]> {
    const cashiers = this.customerRepo.find();

    return cashiers;
  }
}
