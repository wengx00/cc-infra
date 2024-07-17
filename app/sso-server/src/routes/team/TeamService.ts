import { Injectable } from '@cc-infra/edge-ioc';
import { PrismaService } from '@common/PrismaService';
import { tryCatch } from '@common-utils/tools';
import CommonResponse from '@utils/common-response';
import constants from '@utils/constants';
import { errcode, RetError } from '@utils/ret-error';
import typeSafeInstance from '@utils/type-safe-instance';
import { nanoid } from 'nanoid';

import { CreateTeamReq, CreateTeamRes, DeleteTeamReq } from './entity';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  // 创建团队
  async create(payload: CreateTeamReq) {
    const { name } = payload;
    const teamId = nanoid(constants.uidLength);
    const [result, err] = await tryCatch<CreateTeamRes>(
      this.prismaService.client.team.create({
        data: {
          teamId,
          name,
        },
      }),
    );
    if (err) {
      return CommonResponse.fail(
        new RetError(errcode.INTERNAL_ERROR, String(err)),
      );
    }
    return CommonResponse.ok(typeSafeInstance(CreateTeamRes, result));
  }

  async delete(payload: DeleteTeamReq) {
    const { teamId } = payload;
    const [, err] = await tryCatch<CreateTeamRes>(
      this.prismaService.client.team.delete({
        where: {
          teamId,
        },
      }),
    );
    if (err) {
      return CommonResponse.fail(
        new RetError(errcode.INTERNAL_ERROR, String(err)),
      );
    }
    return CommonResponse.ok(null);
  }
}
