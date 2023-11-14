import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { InvoiceItemDTO } from './DTO/invoice-item.dto';
import { Tax } from './Decorators/Tax';
import { Discount } from './Decorators/Discount';

@Controller('item')
export class ItemController {
  constructor(private customerService: ItemService) {}

  @Get()
  getAllItemsBilled() {
    return this.customerService.getAllItemsBilled();
  }

  @Post()
  @Tax(19)
  @Discount(-2000)
  createInvoiceItem(@Body() { name, quantity, price }: InvoiceItemDTO) {
    return this.customerService.createInvoiceItem(name, quantity, price);
  }
}
