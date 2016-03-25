import {ParkaModel} from '../../../src/parka';
import {TableName} from "../../../src/decorators/table-name";


@TableName('Person')
export class PersonModel extends ParkaModel {


}

console.log('PersonModel.query', PersonModel['query']);


