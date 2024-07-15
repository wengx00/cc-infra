import { expect, test } from 'vitest';

import index from '../src/index';

test('Hello World', () => {
  expect(index()).toBe('Hello World');
});
