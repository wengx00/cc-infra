import { Controller, Post, Body } from '@cc-infra/edge-ioc';

import { CreateTeamReq, DeleteTeamReq } from './entity';
import { TeamService } from './TeamService';

@Controller('team')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @Post('create')
  create(@Body() payload: CreateTeamReq) {
    return this.service.create(payload);
  }

  @Post('delete')
  delete(@Body() payload: DeleteTeamReq) {
    return this.service.delete(payload);
  }
}
