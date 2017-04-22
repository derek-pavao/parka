
export interface IRuntimeConfig {
  providers?: Array<any>;
  resources?: Array<any>;
}

export const Application = function (runtimeConfig: IRuntimeConfig) {

  return function (target) {
    target.prototype.__providers = runtimeConfig.providers || [];
    target.prototype.__resourceClasses = runtimeConfig.resources;

  };
};
