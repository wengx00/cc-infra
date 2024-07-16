import { Param, Pipeline } from '@cc-infra/edge-ioc';

export default function File(
  id: string,
  options?: {
    pipelines?: Pipeline[];
  },
) {
  return Param('file', id, options);
}
