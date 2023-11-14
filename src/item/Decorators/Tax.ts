import { SetMetadata } from '@nestjs/common';

export const Tax = (rate: number) => SetMetadata('taxRate', rate);
