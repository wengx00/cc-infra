import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamReq {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateTeamRes {
  @Expose()
  teamId: string;

  name: string;
}

export class DeleteTeamReq {
  @IsNotEmpty()
  @IsString()
  teamId: string;
}
