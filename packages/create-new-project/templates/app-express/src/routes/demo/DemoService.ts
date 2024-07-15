import { Injectable } from '@cc-infra/edge-ioc';
import { CommonResponse } from '@cc-infra/edge-ioc-adapter-express';

@Injectable()
export class DemoService {
  hello(query: Record<string, any>) {
    return CommonResponse.ok(query);
  }

  post(body: Record<string, any>) {
    return CommonResponse.ok(body);
  }
}
