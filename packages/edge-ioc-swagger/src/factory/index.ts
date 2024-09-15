import { Constructor } from '@cc-infra/edge-ioc';

import { BasicInfo, generateBasicInfo } from './basic';
import { generateComponents } from './components';
import { generateIncludes } from './includes';
import { generatePaths } from './paths';

export default function SwaggerFactory(
  module: Constructor<any>,
  basicInfo: BasicInfo,
) {
  const basic = generateBasicInfo(basicInfo);
  const includes = generateIncludes(module);
  const components = generateComponents(includes);
  const paths = generatePaths(includes);

  return {
    ...basic,
    components,
    paths,
  };
}
