import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCashierDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;
}
