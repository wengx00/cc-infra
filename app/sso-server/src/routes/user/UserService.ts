import { Injectable } from '@cc-infra/edge-ioc';
import { PrismaService } from '@common/PrismaService';
import { tryCatch } from '@common-utils/tools';
import CommonResponse from '@utils/common-response';
import constants from '@utils/constants';
import { errcode, RetError } from '@utils/ret-error';
import typeSafeInstance from '@utils/type-safe-instance';
import { nanoid } from 'nanoid';

import { CreateUserReq, CreateUserRes } from './entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUserReq) {
    const { name, teamId, account } = payload;
    const [result, err] = await tryCatch<CreateUserRes>(
      this.prismaService.client.user.create({
        data: {
          name,
          teamId,
          uid: nanoid(constants.uidLength),
          account,
        },
      }),
    );
    if (err) {
      return CommonResponse.fail(
        new RetError(errcode.INTERNAL_ERROR, String(err)),
      );
    }
    return CommonResponse.ok(typeSafeInstance(CreateUserRes, result));
  }
}
