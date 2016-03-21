export class ParkaConfig {

    public appName: string;
    public env: string;
    public host: string;
    public port: number;

    constructor(json) {
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    }
}
