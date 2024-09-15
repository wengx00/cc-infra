import { Constructor } from '@cc-infra/edge-ioc';
import { SwaggerFactoryOptions } from 'src/utils/types';

import { BasicInfo, generateBasicInfo } from './basic';
import { generateComponents } from './components';
import { generateIncludes } from './includes';
import { generatePaths } from './paths';

export default function SwaggerFactory(
  module: Constructor<any>,
  basicInfo: BasicInfo,
  options?: SwaggerFactoryOptions,
) {
  const basic = generateBasicInfo(basicInfo);
  const includes = generateIncludes(module);
  const components = generateComponents(includes);
  const paths = generatePaths(includes, options);

  return {
    ...basic,
    components,
    paths,
  };
}
