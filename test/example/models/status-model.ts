// import {ParkaModel} from "../../../src/core/parka-model";
import * as sequelize from 'sequelize';
 import {TableName} from "../../../src/decorators/table-name";
 import {Model} from "../../../src/decorators/model";

 @Model()
 export class StatusModel {

   public static definition = {
     attributes: {
       id: {
         type: sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       status: sequelize.STRING,
       statusMessage: sequelize.STRING
     }
   };

   public status: string;
   public statusMessage: string;

 }
