import { HttpException, IocFactory } from '@cc-infra/edge-ioc';
import { PairService } from '@common/PairService';
import { PrismaService } from '@common/PrismaService';
import errorResponse from '@utils/error-response';
import globalPipeline from '@utils/global-pipeline';
import { RetError, errcode } from '@utils/ret-error';

import { AppModule } from './AppModule';

const app = IocFactory.create(AppModule);
// console.log(app.getContainer());
app.addGlobalPipeline(globalPipeline);

export default {
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async fetch(request, env, ctx): Promise<Response> {
    try {
      const prismaService = app
        .getContainer()
        .resolve<PrismaService>(PrismaService);
      prismaService.initialize(env);
      const pairService = app.getContainer().resolve<PairService>(PairService);
      pairService.initialize(env);

      return await app.handleHttpRequest(request);
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException || err instanceof RetError) {
        return errorResponse(err);
      }
      return errorResponse(
        new RetError(errcode.INTERNAL_ERROR, '服务内部错误'),
      );
    }
  },
} satisfies ExportedHandler<Env>;
