import { HttpException } from 'edge-ioc';

import CommonResponse from './common-response';
import { RetError } from './ret-error';

export default function errorResponse(error: HttpException | RetError) {
  return CommonResponse.fail(error);
}
