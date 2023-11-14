import { Controller, Param, Post, Res } from '@nestjs/common';
import { FactoryService } from './factory.service';

@Controller('factory')
export class FactoryController {
  constructor(private factoryService: FactoryService) {}

  @Post(':id')
  cashierOrCustomer(@Param('id') id: string, @Res() res) {
    if (id === 'cashier') this.factoryService.instanceCashier(res);
    else this.factoryService.instanceCustomer(res);
  }
}
