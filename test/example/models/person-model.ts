import {ParkaModel} from '../../../src/parka';
import {TableName} from "../../../src/decorators/table-name";
import {Model} from "../../../src/decorators/model";
import {Model as ObjectionModel} from 'objection';

@Model()
@TableName('Person')
export class PersonModel extends ParkaModel {
  public static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],

    properties: {
      id: {type: 'integer'},
      firstName: {type: 'string', maxLength: 255, minLength: 1},
      lastName: {type: 'string', maxLength: 255, minLength: 1},
      middleName: {type: 'string', maxLength: 255},
      dob: {type: 'string', maxLength: 10},
      active: {type: 'boolean', default: true}
    }
  };

}
