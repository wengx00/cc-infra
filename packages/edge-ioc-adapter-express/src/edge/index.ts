import { IocFactory } from '@cc-infra/edge-ioc';

export default class EdgeApplication {
  private constructor(public app: IocFactory) {}

  private static instance: EdgeApplication;

  static getInstance(app?: IocFactory) {
    if (!EdgeApplication.instance && app) {
      EdgeApplication.instance = new EdgeApplication(app);
    }
    return EdgeApplication.instance || null;
  }

  static setInstance(app: IocFactory) {
    EdgeApplication.instance = new EdgeApplication(app);
  }
}
