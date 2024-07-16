import { Injectable } from '@cc-infra/edge-ioc';
import { CommonResponse } from '@cc-infra/edge-ioc-adapter-express';
import { FileEntity } from 'src/utils/FileEntity';

@Injectable()
export class DemoService {
  hello(query: Record<string, any>) {
    return CommonResponse.ok(query);
  }

  post(body: Record<string, any>) {
    return CommonResponse.ok(body);
  }

  file(file: FileEntity) {
    const { encoding, filename, mimeType } = file;
    return CommonResponse.ok({
      encoding,
      filename,
      mimeType,
    });
  }
}
