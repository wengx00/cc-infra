import CommonResponse from '@utils/common-response';
import { Injectable } from '@cc-infra/edge-ioc';

@Injectable()
export class DemoService {
  hello() {
    return CommonResponse.ok('Hello World!');
  }
}
