import { HttpException } from '@cc-infra/edge-ioc';

import { RetError } from './ret-error';

export interface ICommonResponse {
  errMsg: string;
  retcode: number;
  data: any;
}

export default class CommonResponse {
  private errMsg: string;

  private retcode: number;

  private data: any;

  headers: Headers;

  private constructor(res: ICommonResponse) {
    this.errMsg = res.errMsg;
    this.retcode = res.retcode;
    this.data = res.data;
    this.headers = new Headers();
  }

  get body() {
    return {
      errMsg: this.errMsg,
      retcode: this.retcode,
      data: this.data,
    };
  }

  static ok(data: any) {
    const res = new CommonResponse({
      retcode: 0,
      errMsg: '',
      data,
    });
    res.headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(res.body), {
      headers: res.headers,
    });
  }

  static fail(error: HttpException | RetError) {
    const retcode =
      error instanceof HttpException ? error.status : error.retcode;
    const status = error instanceof HttpException ? retcode : 200;
    const statusText = status !== 200 ? error.detail : undefined;
    const res = new CommonResponse({
      retcode,
      errMsg: error.detail,
      data: null,
    });
    res.headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(res.body), {
      headers: res.headers,
      status,
      statusText,
    });
  }
}
