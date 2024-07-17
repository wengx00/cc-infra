import { resolve } from 'path';

import { md5, tarball } from 'src';
import { expect, test } from 'vitest';

test('解压工具', async () => {
  const input = resolve(__dirname, 'case/tarball.tgz');
  const output = resolve(__dirname, 'case/tarball');

  const dest = await tarball.unpack(input, output);

  expect(dest).toBe(output);
});

test('MD5', () => {
  expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
});
