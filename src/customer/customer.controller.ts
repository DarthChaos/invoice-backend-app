import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './DTO/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getAllCashiers() {
    return this.customerService.getAllCustomers();
  }

  @Post()
  createCashier(@Body() { name, email = '' }: CreateCustomerDTO) {
    return this.customerService.createCustomer(name, email);
  }
}
