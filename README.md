# Parka [![Build Status](https://travis-ci.org/dotDeeka/parka.svg?branch=master)](https://travis-ci.org/dotDeeka/parka)

Just as a warning Parka is in a total Pre-Alpha stage, it is not feature complete let alone production
ready.

An example API with Parka will be available at [https://github.com/dotDeeka/parka-todos](https://github.com/dotDeeka/parka-todos)

I suspect that this project will only work with node version 4.x or higher although I haven't tested that

Parka is a simple TypeScript framework/library that runs on Express/NodeJS for building REST services.
Parka takes advantage of TypeScript features like decorators to make things like defining
routes easier.

## Getting Started

Parka relies on a few npm modules to be installed globally, and has its own cli. Run the following
commands to satisfy these global dependencies

```bash
npm install -g parka typescript ts-node pm2 typings nodemon
```

Create a directory for your project and run npm init

```bash
mkdir my-project

cd my-project

npm init
# follow the prompts given by npm init

```

You now have a node project set up. Next we need to add tsconfig.json and typings.json files to
the root of the project

typings.json
```json
{
  "ambientDependencies": {
    "bluebird": "registry:dt/bluebird#2.0.0+20160319051630",
    "express": "registry:dt/express#4.0.0+20160317120654",
    "express-serve-static-core": "registry:dt/express-serve-static-core#0.0.0+20160317120654",
    "knex": "registry:dt/knex#0.0.0+20160321150906",
    "mime": "registry:dt/mime#0.0.0+20160316155526",
    "node": "registry:dt/node#4.0.0+20160319033040",
    "serve-static": "registry:dt/serve-static#0.0.0+20160317120654"
  },
  "dependencies": {
    "lodash": "registry:npm/lodash#4.0.0+20160305082308",
    "objection": "github:dotDeeka/objection-d-ts/typings.json#master"
  }
}
```

tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": true,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  "exclude": [
    "node_modules",
    "typings/browser",
    "typigns/browser.d.ts"
  ],
  "compileOnSave": false
}
```

Now install parka and the typings to you're project
```bash

npm install parka --save

# and

typings install
```

Now that we're set up we can get started on the application it self. Every Parka app requires a main application class, a configuration class and a config.yml file. When a Parka app boots up the configuration yaml file is deserialized into an instance of your configuration class, this is a great place to put environment specific parameters.

#### Lets create our configuration class (./application-config.ts)
```typescript
import {ParkaConfig} from "parka";

export class ApplicationConfig extends ParkaConfig {

}
```

We dont actually need to define anything in this class for the example. We're only going to use properties defined in the parent ParkaConfig class

#### Lets create our application class (./application.ts)

```typescript
import {ParkaApp} from "parka";
import {ApplicationConfig} from "./application-config";
import {ExampleResource} from "./resources/example-resource";


export class Application extends ParkaApp<ApplicationConfig> {


    public onBeforeApplicationStart() {
        // We can register each resource file here. We will create this file in the next step
        this.registerResource(ExampleResource)
    }
}

// Instantiate a new instance of your application
new Application(ApplicationConfig);
```

#### Now lets create the resource file we referenced in our application class in the last step

Resource files are where you define the routes of your application, here we make use of TypeScript decorators

./resources/example-resource.ts
```typescript
import {Path} from "parka";
import {GET} from "parka";

@Path('/example')
export class ExampleResource {

    @GET
    public exampleGet() {
        return {
            status: 'ok'
        };
    }
}
```

#### Lastly lets create our yaml file for our environment specific info
./config.yml
```yaml
appName: my-application
env: dev
host: 0.0.0.0
port: 3000
```

#### Starting the application
We can use the parka cli which wraps pm2 and nodemon to make it work with TypeScript

```bash
# from the root of your project
parka watch application.ts config.yml
```
Your app will now be running in development mode and will reload the server on code changes

#### Stopping the application
Control-C 

