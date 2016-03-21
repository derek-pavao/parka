import * as path from 'path';
import {
    ParkaApp
} from '../src/parka';


import * as express from 'express';
import {ExampleResource} from "./resources/example-resource";
import {MyExampleConfig} from "./my-example-config";




export class MyExampleApp extends ParkaApp<MyExampleConfig> {


    public onBeforeApplicationStart(app: express.Application): void {
        MyExampleApp.app = app;
        this.registerResource(ExampleResource);

    }

}

new MyExampleApp(MyExampleConfig);
