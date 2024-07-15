import {
  HttpException,
  InternalServerErrorException,
  IRequest,
} from '@cc-infra/edge-ioc';
import busboy from 'busboy';
import chalk from 'chalk';
import { RequestHandler } from 'express';
import EdgeApplication from 'src/edge';
import formatTime from 'src/utils/datetime';

import FormData from './formdata';
import Headers from './headers';
import CommonResponse from '../utils/common-response';
import { RetError } from '../utils/ret-error';

const middleware: RequestHandler = async (req, res, next) => {
  console.log(
    chalk.grey(`[${formatTime()}]`),
    req.method.toUpperCase(),
    chalk.yellow(req.path),
  );
  const iocApp = EdgeApplication.getInstance();
  if (!iocApp) {
    throw new Error('Fail to load IocApplication: app does not initialized.');
  }
  const request: IRequest = {
    headers: new Headers(req.headers),
    formData: () =>
      new Promise<FormData>((resolve, reject) => {
        const records: Record<string, any> = {};
        const bb = busboy({
          headers: req.headers,
        });
        bb.on('finish', () => {
          resolve(new FormData(records));
        });
        bb.on('error', reject);
        bb.on('field', (key, value) => {
          records[key] = value;
        });
        bb.on('file', (key, stream, info) => {
          records[key] = {
            stream,
            ...info,
          };
        });
        req.pipe(bb);
      }),
    method: req.method,
    url: `${req.protocol || 'http'}://${req.hostname || 'localhost'}${req.url}`,
    arrayBuffer() {
      return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);

        // 监听数据事件，并将数据累加到 buffer
        req.on('data', (chunk) => {
          buffer = Buffer.concat([buffer, chunk]);
        });

        // 请求结束时，将 buffer 转换为 ArrayBuffer
        req.on('end', () => {
          resolve(
            buffer.buffer.slice(
              buffer.byteOffset,
              buffer.byteOffset + buffer.length,
            ),
          );
          buffer = Buffer.alloc(0);
        });

        // 错误处理
        req.on('error', (err) => {
          reject(err);
        });
      });
    },
    async blob() {
      const res = await this.arrayBuffer();
      return new Blob([res], {
        type: req.headers['content-type'],
      });
    },
    async text() {
      const res = await this.arrayBuffer();
      return new TextDecoder().decode(res);
    },
    async json() {
      const text = await this.text();
      return JSON.parse(text);
    },
  };

  const { app } = iocApp;
  try {
    const result = await app.handleHttpRequest(request);
    if (result instanceof CommonResponse) {
      res.status(result.status);
      Object.entries(Object.fromEntries(result.headers.entries())).forEach(
        ([name, value]) => {
          res.setHeader(name, value);
        },
      );
      res.json(result.body);
      return;
    }
    next(result);
  } catch (err: any) {
    if (err instanceof HttpException || err instanceof RetError) {
      if (err instanceof HttpException) {
        res.status(err.status);
      } else if (err instanceof RetError) {
        res.status(500);
      }
      res.json(CommonResponse.fail(err).body);
      return;
    }
    console.error(err);
    res.status(500);
    res.json(CommonResponse.fail(new InternalServerErrorException()).body);
  }
};

export default middleware;
