import { Injectable } from '@nestjs/common';

@Injectable()
export class FactoryService {
  instanceCashier(res: any) {
    return res.redirect('/cashier');
  }

  instanceCustomer(res: any) {
    return res.redirect('/customer');
  }
}
