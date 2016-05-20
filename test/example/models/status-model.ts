import {ParkaModel} from "../../../src/core/parka-model";
import {TableName} from "../../../src/decorators/table-name";
import {Model} from "../../../src/decorators/model";

@Model()
@TableName('Status')
export class StatusModel extends ParkaModel {
    status: string;
    statusMessage: string;

}
