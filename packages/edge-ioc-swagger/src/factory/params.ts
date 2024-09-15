import { Constructor } from '@cc-infra/edge-ioc';
import constants from 'src/utils/constants';
import primitive from 'src/utils/primitive';

export function generateParams(target: Constructor<any>) {
  const propertiesMetadata =
    Reflect.getMetadata(constants.properties, target) || [];
  const result: Record<string, any>[] = [];

  for (const { propertyKey, type } of propertiesMetadata) {
    const { desc = '', required = true } =
      Reflect.getMetadata(constants.options, target, propertyKey) || {};

    result.push({
      name: propertyKey,
      in: 'query',
      description: desc,
      required,
      schema: {
        type: primitive[type.name.toLowerCase()] || type.name,
      },
    });
  }

  return result;
}
