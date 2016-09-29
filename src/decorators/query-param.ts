export let QueryParam = function (paramName) {


  return function (target: any, name: string, position: number) {
    target[name].__params = target[name].__params || [];

    target[name].__params[position] = {
      paramName,
      paramType: 'QUERY_PARAM'
    };
  };
};
