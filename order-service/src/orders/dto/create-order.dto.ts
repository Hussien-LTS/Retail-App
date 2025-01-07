import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

// DTO for creating an order
export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
