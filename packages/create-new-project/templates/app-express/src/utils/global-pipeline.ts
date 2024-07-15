import { plainToInstance } from 'class-transformer';
import { ValidationError, validateOrReject } from 'class-validator';
import { Constructor } from 'edge-ioc';
import { RetError } from 'edge-ioc-adapter-express';

export default function globalPipeline(
  value: any,
  constructor: Constructor<any>,
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (
      !constructor ||
      constructor === Number ||
      constructor === String ||
      constructor === Boolean
    ) {
      resolve(value);
      return;
    }
    const instance = plainToInstance(constructor, value, {
      enableImplicitConversion: false,
    });
    validateOrReject(instance, {
      validationError: {
        target: false,
        value: false,
      },
      forbidUnknownValues: false,
      stopAtFirstError: true,
      whitelist: true,
    })
      .then(() => {
        resolve(instance);
      })
      .catch((err: any) => {
        const errors: ValidationError[] = err;
        console.log(errors);
        const errMsg =
          Object.values(errors[0].constraints ?? {}).map((item) =>
            item.replace(/\$property/g, errors[0].property),
          )[0] ?? '参数校验失败';
        reject(new RetError(400, errMsg));
      });
  });
}
