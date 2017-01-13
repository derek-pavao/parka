import {Model} from 'objection';


export class ParkaModel {
  public static extend = function (subClassConstructor) {
    return Model.extend.apply(this, arguments);
  }

}
Model.extend(ParkaModel);

