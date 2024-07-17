import { Body, Controller, Post } from '@cc-infra/edge-ioc';

import { CreateUserReq } from './entity';
import { UserService } from './UserService';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('create')
  create(@Body() payload: CreateUserReq) {
    return this.service.create(payload);
  }
}
