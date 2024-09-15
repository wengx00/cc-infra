import {
  Constructor,
  metaType,
  ModuleOptions,
  ParameterInfo,
} from '@cc-infra/edge-ioc';
import constants from 'src/utils/constants';

export interface IncludeInfo {
  target: Constructor<any>;
  path: string;
  handlers: {
    propertyKey: string;
    descriptor: (...args: any[]) => any;
    description: string;
    summary: string;
    tags: string[];
    path: string;
    methods: string[];
    deprecated: boolean;
    result?: Constructor<any>;
    query?: Constructor<any>;
    body?: Constructor<any>;
  }[];
}

function getTargetHandlerInfo(
  handlerInfo: Record<string, any[]>,
  targetKey: string,
) {
  const entries = Object.entries(handlerInfo);
  for (const [path, info] of entries) {
    if (info.find(({ key }) => key === targetKey)) {
      return {
        methods: info.map(({ method }) => method),
        path,
        key: targetKey,
      };
    }
  }
}

export function generateIncludes(root: Constructor<any>): IncludeInfo[] {
  const includes: IncludeInfo[] = [];
  const { controllers, base, modules } =
    (Reflect.getMetadata(metaType.moduleOptions, root) as ModuleOptions) || {};
  for (const controller of controllers || []) {
    const handlerInfo: Record<string, { method: string; path: string }[]> =
      Reflect.getMetadata(metaType.requestHandlers, controller.prototype) || {};

    const handlers = (
      Reflect.getMetadata(constants.methods, controller) || []
    ).map((item: any) => {
      const { propertyKey } = item;
      const options =
        Reflect.getMetadata(constants.options, controller, propertyKey) || {};
      const {
        result,
        desc: description = '',
        summary = '',
        tags = [],
        deprecated = false,
      } = options;

      const targetHandlerInfo = getTargetHandlerInfo(handlerInfo, propertyKey);
      const params: ParameterInfo[] =
        Reflect.getMetadata(
          metaType.injectParam,
          controller.prototype,
          propertyKey,
        ) || [];
      // 找到Body
      const body = params.find((item) => item.group === 'body')?.constructor;
      // 找到Query
      const query = params.find((item) => item.group === 'query')?.constructor;

      return {
        ...targetHandlerInfo,
        propertyKey,
        result,
        description,
        summary,
        body,
        tags,
        query,
        deprecated,
      };
    });
    const path = Reflect.getMetadata(metaType.controllerPath, controller);
    includes.push({
      target: controller,
      handlers,
      path: `${[base, path].filter(Boolean).join('/')}`,
    });
  }
  if (modules && modules.length) {
    modules.forEach((module) => includes.push(...generateIncludes(module)));
  }

  return includes;
}
