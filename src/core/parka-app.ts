import * as fs from 'fs';
import * as YAML from 'yamljs';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as Promise from 'bluebird';
import {
    Request,
    Response
} from 'express';
import {ParkaConfig} from "./parka-config";


export class ParkaApp <T extends ParkaConfig>{

    public static app: express.Application;
    public configFile: string;
    public config: T;

    private port: any;



    constructor(private ConfigConstructor) {
        this.configFile = process.env.PARKA_CONFIG_FILE;
        process.nextTick(() => {
            this.parseAppConfig();
            this.configureExpressServer();
            this.onBeforeApplicationStart(ParkaApp.app);

            this.start();
        });
    }

    public onBeforeApplicationStart(app: express.Application) {}

    public registerResource(ResourceClass: any) {
        this.registerGetRoutes(ResourceClass);
        this.registerPostRoutes(ResourceClass);
        this.registerPutRoutes(ResourceClass);
        this.registerDeleteRoutes(ResourceClass);
    }

    private registerDeleteRoutes(ResourceClass) {
        let deleteMethods: Array<any> = ResourceClass.__delete;

        if (typeof deleteMethods !== 'undefined') {

            deleteMethods.forEach((deleteMethod) => {
                ParkaApp.app.delete(this.getPath(ResourceClass, deleteMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, deleteMethod.methodName, req);

                    Promise.resolve(resource[deleteMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    });
                });
            });
        }
    }

    private registerPutRoutes(ResourceClass: any) {
        let putMethods: Array<any> = ResourceClass.__put;

        if (typeof putMethods !== 'undefined') {

            putMethods.forEach((putMethod) => {
                ParkaApp.app.put(this.getPath(ResourceClass, putMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, putMethod.methodName, req);

                    Promise.resolve(resource[putMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    });
                });
            });
        }
    }

    private registerPostRoutes(ResourceClass: any) {
        let postMethods: Array<any> = ResourceClass.__post;

        if (typeof postMethods !== 'undefined') {

            postMethods.forEach((postMethod) => {
                ParkaApp.app.post(this.getPath(ResourceClass, postMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, postMethod.methodName, req);

                    Promise.resolve(resource[postMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    });
                });
            });
        }
    }

    private registerGetRoutes(ResourceClass: any) {

        let getMethods: Array<any> = ResourceClass.__get;

        if (typeof getMethods !== 'undefined') {
            getMethods.forEach((getMethod) => {
                ParkaApp.app.get(this.getPath(ResourceClass, getMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, getMethod.methodName, req);

                    Promise.resolve(resource[getMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    });
                });
            });
        }
    }


    private getParamList(ResourceClass: any, methodName: string, req: express.Request): Array<any> {
        if (typeof ResourceClass.prototype[methodName].__params !== 'undefined') {

            return ResourceClass.prototype[methodName].__params.map((paramDef) => {

                if (paramDef.paramType === 'PATH_PARAM') {
                    return req.params[paramDef.paramName];
                } else if (paramDef.paramType === 'QUERY_PARAM') {
                    return req.query[paramDef.paramName];
                } else if (paramDef.paramType === 'REQUEST_BODY') {

                    return this.constructCorrectType(req, paramDef);
                }
            });
        } else {
            return [];
        }
    }

    private constructCorrectType(req: express.Request, paramDef: any) {
        if (typeof paramDef.constructor !== 'undefined') {
            if (paramDef.isArray === true) {
                return req.body.map((item) => {
                    return new paramDef.constructor(item);
                });
            } else {
                return new paramDef.constructor(req.body);
            }
        } else {
            return req.body;
        }
    }

    private getPath(ResourceClass, getMethod): string {
        let path = [];
        path.push(ResourceClass.__path);

        let methodPath = ResourceClass.prototype[getMethod.methodName].__path;

        if (typeof methodPath !== 'undefined') {
            path.push(methodPath);
        }

        return path.join('');
    }

    private start() {

        let server: http.Server = http.createServer(<any> ParkaApp.app);

        server.listen(this.config.port, this.config.host, () => {
            console.log('server listening at ', server.address().address + ':' + server.address().port);
        });

    }

    private parseAppConfig() {
        console.log('configFile', this.configFile);
        let configFileContents = YAML.load(this.configFile);
        this.config = new this.ConfigConstructor(configFileContents);
    }

    private configureExpressServer() {
        let app: express.Application = express();


        app.use(logger(this.config.env));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());

        app.get('/', (req: Request, res: Response) => {
            res.send('it worked');
        });

        ParkaApp.app = app;
    }

}
