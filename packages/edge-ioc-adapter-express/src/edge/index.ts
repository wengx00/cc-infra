import { IApplication } from '@cc-infra/edge-ioc';

export default class EdgeApplication {
  private constructor(public app: IApplication) {}

  private static instance: EdgeApplication;

  static getInstance(app?: IApplication) {
    if (!EdgeApplication.instance && app) {
      EdgeApplication.instance = new EdgeApplication(app);
    }
    return EdgeApplication.instance || null;
  }

  static setInstance(app: IApplication) {
    EdgeApplication.instance = new EdgeApplication(app);
  }
}
