import CommonResponse from '@utils/common-response';
import { Injectable } from 'edge-ioc';

@Injectable()
export class DemoService {
  hello() {
    return CommonResponse.ok('Hello World!');
  }
}
