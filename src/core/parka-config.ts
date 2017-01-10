export class ParkaConfig {

  public appName: string;
  public env: string;
  public host: string;
  public port: number;
  public db: IDbConnection;
  public routing: IRoutingConfig;
  public includeStacktraceInResponse: boolean;

  constructor(json) {
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        this[key] = json[key];
      }
    }
  }
}

export interface IDbConnection {
  client: string;
  connection: any;
  useNullAsDefault?: boolean
}

export interface IRoutingConfig {
  prefix: string;
}
