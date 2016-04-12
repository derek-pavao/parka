import * as fs from 'fs';
import * as YAML from 'yamljs';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as Promise from 'bluebird';
import * as knex from 'knex';
const objection = require('objection');
import {
    Request,
    Response
} from 'express';
import {ParkaConfig} from "./parka-config";


export class ParkaApp <T extends ParkaConfig>{

    public static appInstance: ParkaApp<ParkaConfig>;
    public expressApp: express.Application;
    public configFile: string;
    public config: T;

    private port: any;



    constructor(private ConfigConstructor) {
        this.configFile = process.env.PARKA_CONFIG_FILE;
        process.nextTick(() => {
            ParkaApp.appInstance = this;
            this.parseAppConfig();
            this.configureDatabaseConneciton();
            this.configureExpressServer();
            this.onBeforeApplicationStart();

            this.start();
        });
    }

    public onBeforeApplicationStart() {}

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
                this.expressApp.delete(this.getPath(ResourceClass, deleteMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, deleteMethod.methodName, req);

                    Promise.resolve(resource[deleteMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    }).catch((err) => res.status(err.statusCode || 500).json(err));
                });
            });
        }
    }

    private registerPutRoutes(ResourceClass: any) {
        let putMethods: Array<any> = ResourceClass.__put;

        if (typeof putMethods !== 'undefined') {

            putMethods.forEach((putMethod) => {
                this.expressApp.put(this.getPath(ResourceClass, putMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, putMethod.methodName, req);

                    Promise.resolve(resource[putMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    }).catch((err) => res.status(err.statusCode || 500).json(err));
                });
            });
        }
    }

    private registerPostRoutes(ResourceClass: any) {
        let postMethods: Array<any> = ResourceClass.__post;

        if (typeof postMethods !== 'undefined') {

            postMethods.forEach((postMethod) => {
                this.expressApp.post(this.getPath(ResourceClass, postMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, postMethod.methodName, req);

                    Promise.resolve(resource[postMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    }).catch((err) => res.status(err.statusCode || 500).json(err));
                });
            });
        }
    }

    private registerGetRoutes(ResourceClass: any) {

        let getMethods: Array<any> = ResourceClass.__get;

        if (typeof getMethods !== 'undefined') {
            getMethods.forEach((getMethod) => {
                this.expressApp.get(this.getPath(ResourceClass, getMethod), (req, res) => {
                    let resource = new ResourceClass();
                    resource.req = req;
                    resource.res = res;

                    let paramList: Array<any> = this.getParamList(ResourceClass, getMethod.methodName, req);

                    Promise.resolve(resource[getMethod.methodName].apply(resource, paramList)).then((returnValue) => {
                        res.json(returnValue);
                    }).catch((err) => res.status(err.statusCode || 500).json(err));
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
                    return paramDef.constructor.fromJson(item);
                });
            } else {
                return paramDef.constructor.fromJson(req.body);
            }
        } else {
            return req.body;
        }
    }

    private getPath(ResourceClass, getMethod): string {
        let path = [];
        if (this.config.routing && this.config.routing.prefix) {
            path.push(this.config.routing.prefix);
        }
        path.push(ResourceClass.__path);

        let methodPath = ResourceClass.prototype[getMethod.methodName].__path;

        if (typeof methodPath !== 'undefined') {
            path.push(methodPath);
        }

        return path.join('');
    }

    private start() {

        let server: http.Server = http.createServer(<any> this.expressApp);

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

        this.expressApp = app;
    }

    private configureDatabaseConneciton() {
        const conn = knex(this.config.db);

        objection.Model.knex(conn);
    }

}
