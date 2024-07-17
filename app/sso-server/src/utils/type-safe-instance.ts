import { Constructor } from '@cc-infra/edge-ioc';
import { plainToInstance } from 'class-transformer';

export default function typeSafeInstance(
  constructor: Constructor<any>,
  value: any,
) {
  return plainToInstance(constructor, value, {
    excludeExtraneousValues: true,
  });
}
