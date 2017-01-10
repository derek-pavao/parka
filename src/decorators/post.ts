export let POST = function (target: any, name: string) {

  target.constructor.__post = target.constructor.__post || [];

  target.constructor.__post.push({
    methodName: name
  });
};
