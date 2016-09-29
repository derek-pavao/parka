export let Path = function (url: string) {
  return function (target: Object, name?: string) {
    if (typeof name === 'undefined') {
      target['__path'] = url;
    } else {
      target[name]['__path'] = url;
    }

  };
};
