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

import fileParamsHandler from './file-params-handler';
import FormData from './formdata';
import Headers from './headers';
import CommonResponse from '../utils/common-response';
import { RetError } from '../utils/ret-error';

const middleware: RequestHandler = async (req, res, next) => {
  const cachedRequest: Partial<Record<keyof IRequest, any>> = {};
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
    ...req,
    headers: new Headers(req.headers),
    formData: () =>
      new Promise<FormData>((resolve, reject) => {
        if (cachedRequest.formData) {
          resolve(cachedRequest.formData);
          return;
        }
        const records: Record<string, any> = {};
        const bb = busboy({
          headers: req.headers,
        });
        bb.on('finish', () => {
          cachedRequest.formData = new FormData(records);
          resolve(cachedRequest.formData);
        });
        bb.on('error', reject);
        bb.on('field', (key, value) => {
          records[key] = value;
        });
        bb.on('file', (key, stream, info) => {
          let buffer = Buffer.alloc(0);
          stream.on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
          });
          stream.on('close', () => {
            records[key] = {
              buffer,
              ...info,
            };
            buffer = Buffer.alloc(0);
          });
        });
        req.pipe(bb);
      }),
    method: req.method,
    url: `${req.protocol || 'http'}://${req.hostname || 'localhost'}${req.url}`,
    arrayBuffer() {
      if (cachedRequest.arrayBuffer) {
        return Promise.resolve(cachedRequest.arrayBuffer);
      }
      return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);

        // 监听数据事件，并将数据累加到 buffer
        req.on('data', (chunk) => {
          buffer = Buffer.concat([buffer, chunk]);
        });

        // 请求结束时，将 buffer 转换为 ArrayBuffer
        req.on('end', () => {
          cachedRequest.arrayBuffer = buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.length,
          );
          resolve(cachedRequest.arrayBuffer);
          buffer = Buffer.alloc(0);
        });

        // 错误处理
        req.on('error', (err) => {
          reject(err);
        });
      });
    },
    async blob() {
      if (cachedRequest.blob) {
        return cachedRequest.blob;
      }
      const res = await this.arrayBuffer();
      cachedRequest.blob = new Blob([res], {
        type: req.headers['content-type'],
      });
      return cachedRequest.blob;
    },
    async text() {
      if (cachedRequest.text) {
        return cachedRequest.text;
      }
      const res = await this.arrayBuffer();
      cachedRequest.text = new TextDecoder().decode(res);
      return cachedRequest.text;
    },
    async json() {
      if (cachedRequest.json) {
        return cachedRequest.json;
      }
      const text = await this.text();
      cachedRequest.json = JSON.parse(text);
      return cachedRequest.json;
    },
  };

  const { app } = iocApp;
  app.addParamsHandler(fileParamsHandler);
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
