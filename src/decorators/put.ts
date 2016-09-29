export let PUT = function (target: any, name: string) {
  target.constructor.__put = target.constructor.__put || [];

  target.constructor.__put.push({
    methodName: name
  });
};
