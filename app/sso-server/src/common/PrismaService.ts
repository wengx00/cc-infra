import { Injectable } from '@cc-infra/edge-ioc';
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  client: PrismaClient;

  initialize(env: Env) {
    if (!this.client) {
      const adapter = new PrismaD1(env.prodDB);
      this.client = new PrismaClient({ adapter });
    }
  }
}
