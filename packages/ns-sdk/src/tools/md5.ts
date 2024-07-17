import CryptoJS from 'crypto-js';

export default function md5(str: string) {
  return CryptoJS.MD5(CryptoJS.enc.Utf8.parse(str)).toString();
}
