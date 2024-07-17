import { Injectable } from '@cc-infra/edge-ioc';

@Injectable()
export class PairService {
  kv: KVNamespace;

  initialize(env: Env) {
    this.kv = env.prodKV;
  }
}
