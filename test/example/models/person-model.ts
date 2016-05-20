import {ParkaModel} from '../../../src/parka';
import {TableName} from "../../../src/decorators/table-name";
import {Model} from "../../../src/decorators/model";


@TableName('Person')
@Model()
export class PersonModel extends ParkaModel {


}



