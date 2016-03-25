export class ParkaConfig {

    public appName: string;
    public env: string;
    public host: string;
    public port: number;
    public db: IDbConnection;

    constructor(json) {
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    }
}

interface IDbConnection {
    client: string;
    connection: any;
    useNullAsDefault?: boolean
}

