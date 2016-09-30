import * as sequelize from 'sequelize';
import {ParkaModel} from "../../../src/core/parka-model";
import {Model} from "../../../src/decorators/model";

@Model()
export class PersonModel extends ParkaModel {
  public static definition = {
    attributes: {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: sequelize.STRING,
      lastName: sequelize.STRING,
    }
  };
}


// @Model()
// @TableName('Person')
// export class PersonModel {
//   public static jsonSchema = {
//     type: 'object',
//     required: ['firstName', 'lastName'],
//
//     properties: {
//       id: {type: 'integer'},
//       firstName: {type: 'string', maxLength: 255, minLength: 1},
//       lastName: {type: 'string', maxLength: 255, minLength: 1},
//       middleName: {type: 'string', maxLength: 255},
//       dob: {type: 'string', maxLength: 10},
//       active: {type: 'boolean', default: true}
//     }
//   };
//
// }
