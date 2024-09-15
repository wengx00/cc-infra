import { Body, Controller, Get, Query } from '@cc-infra/edge-ioc';
import { Api } from 'src/decorators/Api';

import { DemoEntity } from './DemoEntity';

@Controller('demo')
export class DemoController {
  @Get('hello')
  @Api({
    summary: '测试API',
    result: DemoEntity,
  })
  hello(@Body() body: DemoEntity, @Query() query: Record<string, any>) {
    console.log(body, query);
  }
}
