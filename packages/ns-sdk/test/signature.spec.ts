import { nanoid } from 'nanoid';
import { expect, test } from 'vitest';

import { nsSign, nsVerify } from '../src';

test('NS 签名', () => {
  const secret = nanoid(16);
  const appid = nanoid(8);
  console.log('随机生成 secret: ', secret);
  console.log('随机生成 appid: ', appid);
  const timestamp = +new Date();
  const signature = nsSign({ secret, appid, timestamp });
  console.log('生成 signature: ', signature);
  expect(nsVerify({ signature, secret, appid, timestamp })).toBe(true);
});

test('指定 NS 签名', () => {
  const secret = '!scnu-title-audit';
  const appid = '10000';
  const timestamp = +new Date();
  const signature = nsSign({ secret, appid, timestamp });
  console.log('时间戳', timestamp);
  console.log('指定 signature: ', signature);
  expect(nsVerify({ signature, secret, appid, timestamp })).toBe(true);
});
