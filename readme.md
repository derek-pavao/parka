# Parka

Just as a warning Parka is in a total Pre-Alpha stage, it is not feature complete let alone production
ready.

Parka is a simple TypeScript framework/library that runs on Express/NodeJS for building REST services.
Parka takes advantage of TypeScript features like decorators to make things like defining
routes easier.

## Getting Started

Parka relies on a few npm modules to be installed globally, and has its own cli. Run the following
commands to satisfy these global dependencies

```bash
npm install -g parka typescript ts-node pm2 typings
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
    "express": "registry:dt/express#4.0.0+20160317120654",
    "express-serve-static-core": "registry:dt/express-serve-static-core#0.0.0+20160317120654",
    "mime": "registry:dt/mime#0.0.0+20160316155526",
    "node": "registry:dt/node#4.0.0+20160319033040",
    "serve-static": "registry:dt/serve-static#0.0.0+20160317120654"
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
    "typings/main",
    "typings/browser",
    "typings/main.d.ts"
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



