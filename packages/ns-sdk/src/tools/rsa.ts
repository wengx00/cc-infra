import crypto from 'crypto';

function generateKeyPair(modulusLength = 1024) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  return { publicKey, privateKey };
}

function publicEncrypt(data: string, publicKey: string) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString();
}

function privateDecrypt(encryptData: string, privateKey: string) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encryptData)).toString();
}

export default { generateKeyPair, publicEncrypt, privateDecrypt };
