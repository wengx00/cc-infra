import primitive from 'src/utils/primitive';

import { IncludeInfo } from './includes';

export function generatePaths(includes: IncludeInfo[]) {
  const paths: Record<string, any> = {};
  includes.forEach(({ path: base, handlers }) => {
    handlers.forEach(
      ({
        methods,
        path,
        description,
        summary,
        tags,
        query,
        body,
        result,
        deprecated,
      }) => {
        const fullPath = `/${[base, path].join('/')}`;
        const pathItem: Record<string, any> = {};
        methods.forEach((method) => {
          pathItem[method.toLowerCase()] = {
            summary,
            description,
            tags,
            deprecated,
          };
          if (query && !primitive[query.name.toLowerCase() || '']) {
            pathItem[method.toLowerCase()].parameters = {
              $ref: `#/components/schemas/${query.name}`,
            };
          }
          if (body && !primitive[body.name.toLowerCase() || '']) {
            pathItem[method.toLowerCase()].requestBody = {
              content: {
                'application/json': {
                  schema: {
                    $ref: `#/components/schemas/${body.name}`,
                  },
                },
              },
            };
          }

          if (result && !primitive[result.name.toLowerCase() || '']) {
            pathItem[method.toLowerCase()].responses = {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: `#/components/schemas/${result.name}`,
                    },
                  },
                },
              },
            };
          }
        });

        paths[fullPath] = pathItem;
      },
    );
  });
  return paths;
}
