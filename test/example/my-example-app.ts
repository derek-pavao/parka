import * as path from 'path';
import {
  ParkaApp,
  Application
} from '../../src/parka';


import {ExampleResource} from "./resources/example-resource";
import {MyExampleConfig} from "./my-example-config";

import {PersonService} from './services/person-service';
import {ExampleService} from './services/example-service';


@Application({
  providers: [PersonService, ExampleService],
  resources: [ExampleResource]
})
export class MyExampleApp extends ParkaApp<MyExampleConfig> {


  public onBeforeApplicationStart(): void {

    this.registerResource(ExampleResource);

  }

}

export let app = new MyExampleApp(MyExampleConfig);
