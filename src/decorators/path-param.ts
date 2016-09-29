export let PathParam = function (paramName: string) {
  return function (target: any, name: string, position: number) {

    target[name].__params = target[name].__params || [];

    target[name].__params[position] = {
      paramName,
      paramType: 'PATH_PARAM'
    };
  };
};
