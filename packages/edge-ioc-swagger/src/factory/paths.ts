import primitive from 'src/utils/primitive';
import { SwaggerFactoryOptions } from 'src/utils/types';

import { IncludeInfo } from './includes';
import { generateParams } from './params';

export function generatePaths(
  includes: IncludeInfo[],
  options?: SwaggerFactoryOptions,
) {
  const { getResponseSchema } = options || {};
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
            pathItem[method.toLowerCase()].parameters = generateParams(query);
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

          const content: Record<string, any> = {
            'application/json': {},
          };

          if (getResponseSchema) {
            content['application/json'] = {
              schema: getResponseSchema(
                result && !primitive[result.name.toLowerCase()]
                  ? result.name
                  : undefined,
              ),
            };
          } else if (result && !primitive[result.name.toLowerCase()]) {
            content['application/json'] = {
              schema: {
                $ref: `#/components/schemas/${result.name}`,
              },
            };
          }
          pathItem[method.toLowerCase()].responses = {
            '200': {
              description: '',
              content,
            },
          };
        });

        paths[fullPath] = pathItem;
      },
    );
  });
  return paths;
}
