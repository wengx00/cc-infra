import { Module } from '@cc-infra/edge-ioc';

import { DemoController } from './routes/demo/DemoController';
import { DemoService } from './routes/demo/DemoService';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
  base: '',
})
export class AppModule {}
