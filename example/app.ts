import * as path from 'path';
import {
    ParkaApp
} from '../src/index';


import * as express from 'express';
import {ExampleResource} from "./resources/example-resource";



export class MyApp extends ParkaApp {


    constructor() {
        super();
        this.configFile = path.join(__dirname, './config.yml');
    }

    public onBeforeApplicationStart(app: express.Application): void {
        MyApp.app = app;
        this.registerResource(ExampleResource);
    }

}

new MyApp();
