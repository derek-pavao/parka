import {ParkaModel} from '../parka';

export let Model = function () {
  return function (target) {
    ParkaModel.extend(target);
  };
};
