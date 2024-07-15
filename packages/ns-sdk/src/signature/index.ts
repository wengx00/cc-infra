/**
 * NS 签名
 * 规则：
 * timestamp-appid-secret-timestamp 拼接，然后 SHA256 再转化为 Hex 大写
 */

import CryptoJS from 'crypto-js';

export interface NSSignOptions {
  secret: string;
  appid: string;
  timestamp: number;
}

export interface NSVerifyOptions {
  signature: string;
  secret: string;
  appid: string;
  timestamp: number;
}

export function nsSign({ secret, appid, timestamp }: NSSignOptions) {
  return CryptoJS.SHA256(`${timestamp}-${appid}-${secret}-${timestamp}`)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
}

export function nsVerify({
  signature,
  secret,
  appid,
  timestamp,
}: NSVerifyOptions) {
  const message = `${timestamp}-${appid}-${secret}-${timestamp}`;
  return (
    CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex).toUpperCase() ===
    signature
  );
}
