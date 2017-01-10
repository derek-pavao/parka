export let GET = function (target: any, name: string) {

  target.constructor.__get = target.constructor.__get || [];

  target.constructor.__get.push({
    methodName: name
  });
};
