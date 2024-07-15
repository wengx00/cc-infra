import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class HelloReq {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Type(() => Number)
  age: number;
}
