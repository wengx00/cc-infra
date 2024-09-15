import { Constructor } from '@cc-infra/edge-ioc';
import constants from 'src/utils/constants';
import primitive from 'src/utils/primitive';

import { IncludeInfo } from './includes';

export function generateComponents(includes: IncludeInfo[]) {
  const components = {
    schemas: {} as Record<string, any>,
  };

  // 生成Schema对象
  const getSchema = (target: Constructor<any>): void => {
    if (components.schemas[target.name]) {
      return;
    }
    const primitiveType = primitive[target.name.toLowerCase()];
    if (primitiveType) {
      return;
    }

    const result = {
      type: 'object',
      title: target.name,
      required: [] as string[],
    };

    const propertiesMetadata =
      Reflect.getMetadata(constants.properties, target) || [];
    const properties: Record<string, any> = {};

    for (const { propertyKey, type } of propertiesMetadata) {
      const { desc = '', required = true } =
        Reflect.getMetadata(constants.options, target, propertyKey) || {};

      properties[propertyKey] = {
        description: desc,
      };

      if (required) {
        result.required.push(propertyKey);
      }

      const subInfo = Reflect.getMetadata(constants.properties, type);
      if (subInfo) {
        if (!components.schemas[type.name]) {
          getSchema(type);
        }

        properties[propertyKey].$ref = `#/components/schemas/${type.name}`;
      } else {
        properties[propertyKey].type =
          primitive[type.name.toLowerCase()] || type;
      }
    }

    components.schemas[target.name] = {
      ...result,
      properties,
    };
  };

  for (const include of includes) {
    const { handlers } = include;
    for (const handler of handlers) {
      const { result, body, query } = handler;
      if (result) {
        getSchema(result);
      }

      if (body) {
        getSchema(body);
      }

      if (query) {
        getSchema(query);
      }
    }
  }

  return components;
}
