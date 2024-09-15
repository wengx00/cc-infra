import { Constructor } from '@cc-infra/edge-ioc';
import constants from 'src/utils/constants';

import { createMethodDecorator } from './helper';

export interface ApiOptions {
  summary?: string;
  desc?: string;
  tags?: string[];
  deprecated?: boolean;
  result?:
    | Constructor<any>
    | (() => Constructor<any>)
    | [Constructor<any>]
    | (() => [Constructor<any>]);
}

export function Api(options?: ApiOptions): MethodDecorator {
  return createMethodDecorator(
    constants.options,
    options,
    (newValue, oldValue) => {
      return {
        ...oldValue,
        ...newValue,
      };
    },
  );
}
