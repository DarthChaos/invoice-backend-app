import { SetMetadata } from '@nestjs/common';

export const Discount = (percentage: number) =>
  SetMetadata('discountPercentage', percentage);
