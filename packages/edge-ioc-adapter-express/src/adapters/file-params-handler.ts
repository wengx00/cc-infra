import { IocRequest, IParamsHandler, ParameterInfo } from '@cc-infra/edge-ioc';
import { FileInfo } from 'busboy';

const fileParamsHandler: IParamsHandler = async (
  info: ParameterInfo & {
    request: IocRequest;
  },
) => {
  const { request, group, id } = info;
  if (group !== 'file' || !id) {
    return null;
  }
  const pool = await request.formData();
  if (!pool.has(id)) {
    return undefined;
  }
  const file = pool.get<
    {
      buffer?: Buffer;
    } & FileInfo
  >(id)!;
  if (!file.buffer) {
    return undefined;
  }
  return file;
};

export default fileParamsHandler;
