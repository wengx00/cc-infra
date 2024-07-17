import { resolve } from 'path';

import { md5, rsa, tarball } from 'src';
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

test('RSA', () => {
  const { privateKey, publicKey } = rsa.generateKeyPair();
  expect(privateKey).toBeDefined();
  expect(publicKey).toBeDefined();
  const originData = 'Hello World';
  const encryptData = rsa.publicEncrypt(originData, publicKey);
  console.log('encryptData', encryptData);
  const decryptData = rsa.privateDecrypt(encryptData, privateKey);
  console.log('decryptData', decryptData);
  expect(decryptData).toBe(originData);
});
