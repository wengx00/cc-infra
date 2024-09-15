import constants from 'src/utils/constants';

import { createPropertyDecorator } from './helper';

export interface ApiPropertyOptions {
  desc?: string;
  required?: boolean;
}

export function ApiProperty(options?: ApiPropertyOptions): PropertyDecorator {
  return createPropertyDecorator(constants.options, options);
}
