import * as path from 'path';
import {
  ParkaApp
} from '../../src/parka';


import {ExampleResource} from "./resources/example-resource";
import {MyExampleConfig} from "./my-example-config";



class MyExampleApp extends ParkaApp<MyExampleConfig> {


  public onBeforeApplicationStart(): void {

    this.registerResource(ExampleResource);

  }

}

export let app = new MyExampleApp(MyExampleConfig);
