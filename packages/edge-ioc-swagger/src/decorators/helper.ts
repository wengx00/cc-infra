import constants from 'src/utils/constants';

export function createPropertyDecorator(
  dataKey: string,
  dataValue: any,
  conflictHandler?: (newValue: any, oldValue: any) => any,
): PropertyDecorator {
  return (target, propertyKey) => {
    const properties =
      Reflect.getMetadata(constants.properties, target.constructor) || [];
    const type = Reflect.getMetadata(constants.designType, target, propertyKey);
    Reflect.defineMetadata(
      constants.properties,
      [
        ...properties,
        {
          propertyKey,
          type,
        },
      ],
      target.constructor,
    );
    const existValue = Reflect.getMetadata(
      dataKey,
      target.constructor,
      propertyKey,
    );
    if (existValue !== undefined) {
      Reflect.defineMetadata(
        dataKey,
        conflictHandler ? conflictHandler(dataValue, existValue) : dataValue,
        target,
      );
    } else {
      Reflect.defineMetadata(
        dataKey,
        dataValue,
        target.constructor,
        propertyKey,
      );
    }
  };
}

export function createMethodDecorator(
  dataKey: string,
  dataValue: any,
  conflictHandler?: (newValue: any, oldValue: any) => any,
): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const methods =
      Reflect.getMetadata(constants.methods, target.constructor) || [];
    if (!methods.find((method: any) => method.propertyKey === propertyKey)) {
      Reflect.defineMetadata(
        constants.methods,
        [
          ...methods,
          {
            propertyKey,
            descriptor: descriptor.value,
          },
        ],
        target.constructor,
      );
    }
    const existValue = Reflect.getMetadata(
      dataKey,
      target.constructor,
      propertyKey,
    );
    if (existValue !== undefined) {
      Reflect.defineMetadata(
        dataKey,
        conflictHandler ? conflictHandler(dataValue, existValue) : dataValue,
        target.constructor,
        propertyKey,
      );
    } else {
      Reflect.defineMetadata(
        dataKey,
        dataValue,
        target.constructor,
        propertyKey,
      );
    }
  };
}
