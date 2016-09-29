export let DELETE = function (target: any, name: string) {

  target.constructor.__delete = target.constructor.__delete || [];

  target.constructor.__delete.push({
    methodName: name
  });
};
