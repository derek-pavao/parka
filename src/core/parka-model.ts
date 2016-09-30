import {Model} from "../parka";

export abstract class ParkaModel {
  public static definition: any;

  private static __modelsMap: {[modelName: string] : any} = {};

  public static addModelDefinition(modelName: string, constructorFn: any) {
    ParkaModel.__modelsMap[modelName] = constructorFn;
  }

  public static getModelDefinition(modelName: string): any {
    return ParkaModel.__modelsMap[modelName];
  }

  public static getModelMap() {
    return ParkaModel.__modelsMap;
  }
}
