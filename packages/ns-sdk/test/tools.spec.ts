import { resolve } from 'path';

import { tarball } from 'src';
import { expect, test } from 'vitest';

test('解压工具', async () => {
  const input = resolve(__dirname, 'case/tarball.tgz');
  const output = resolve(__dirname, 'case/tarball');

  const dest = await tarball.unpack(input, output);

  expect(dest).toBe(output);
});
