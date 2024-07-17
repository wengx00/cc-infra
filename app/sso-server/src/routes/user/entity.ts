import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserReq {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  account: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}

export class CreateUserRes {
  @Expose()
  uid: string;

  @Expose()
  account: string;

  @Expose()
  name: string;

  @Expose()
  teamId: string;
}
