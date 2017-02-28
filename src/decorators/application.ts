import {ReflectiveInjector} from 'injection-js';

export interface IRuntimeConfig {
  providers?: Array<any>;
  resources?: Array<any>;
}

export const Application = function (runtimeConfig: IRuntimeConfig) {

  return function (target) {
    target.prototype.__injector = ReflectiveInjector.resolveAndCreate(runtimeConfig.providers)
  };
};
