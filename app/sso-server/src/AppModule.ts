import { Module } from '@cc-infra/edge-ioc';
import { PairService } from '@common/PairService';
import { PrismaService } from '@common/PrismaService';
import { TeamController } from '@routes/team/TeamController';
import { TeamService } from '@routes/team/TeamService';
import { UserController } from '@routes/user/UserController';
import { UserService } from '@routes/user/UserService';

@Module({
  controllers: [UserController, TeamController],
  providers: [PrismaService, PairService, UserService, TeamService],
  modules: [],
  base: 'api',
})
export class AppModule {}
