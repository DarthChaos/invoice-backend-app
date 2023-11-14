import { Body, Controller, Get, Post } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDTO } from './DTO/cashier.dto';

@Controller('cashier')
export class CashierController {
  constructor(private cashierService: CashierService) {}

  @Get()
  getAllCashiers() {
    return this.cashierService.getAllCashiers();
  }

  @Post()
  createCashier(@Body() { name, email = '' }: CreateCashierDTO) {
    return this.cashierService.createCashier(name, email);
  }
}
