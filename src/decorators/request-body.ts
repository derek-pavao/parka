export let RequestBody = function (T?, isArray = false) {

  return function (target: any, name: string, position: number) {

    target[name].__params = target[name].__params || [];

    target[name].__params[position] = {
      isArray,
      paramType: 'REQUEST_BODY',
      constructor: T
    };
  };
};
