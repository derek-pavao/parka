import {ParkaModel} from '../core/parka-model';
import {ParkaApp} from '../core/parka-app';

export let Model = function () {
  return function (target) {

    ParkaModel.addModelDefinition(target.name, target);
  };
};
