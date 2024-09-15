import { Module } from '@cc-infra/edge-ioc';

import { DemoController } from './DemoController';

@Module({
  controllers: [DemoController],
})
export class AppModule {}
