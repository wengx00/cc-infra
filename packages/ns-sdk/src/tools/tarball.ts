import zlib from 'zlib';

import { createReadStream } from 'fs-extra';
import tar from 'tar-fs';

export default {
  unpack(source: string, dest: string) {
    return new Promise<string>((resolve, reject) => {
      const readStream = createReadStream(source);
      const unzipStream = zlib.createGunzip();
      const extra = tar.extract(dest);

      readStream
        .pipe(unzipStream)
        .pipe(extra)
        .on('finish', () => {
          resolve(dest);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  },
};
