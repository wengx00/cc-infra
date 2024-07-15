import { PrismaClient } from '@prisma/client';
import { Injectable } from 'edge-ioc';

@Injectable()
export class PrismaService {
  client: PrismaClient;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(env: Env) {
    // if (!this.client) {
    //   const adapter = new PrismaD1();
    //   this.client = new PrismaClient({ adapter });
    // }
  }
}
