import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationReq {
  @IsInt()
  @Type(() => Number)
  offset: number;

  @IsInt()
  @Type(() => Number)
  limit: number;
}
