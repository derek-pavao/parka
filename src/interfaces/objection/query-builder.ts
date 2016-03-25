import * as knex from 'knex';
import {ParkaModel} from '../../core/parka-model';



export interface QueryBuilder extends knex.QueryBuilder {

    findById(arg: any|Array<any>): QueryBuilder;

    insert(modelsOrObjects: Object|ParkaModel|Array<Object>|Array<ParkaModel>): QueryBuilder;

    insertAndFetch(modelsOrObjects: Object|ParkaModel|Array<Object>|Array<ParkaModel>): QueryBuilder;

    insertWithRelated(graph: Object|ParkaModel|Array<Object>|Array<ParkaModel>): QueryBuilder;

    update(modelOrObject: Object|ParkaModel): QueryBuilder;

    updateAndFetchById(id: string|number, modelorObject: Object|ParkaModel): QueryBuilder;

    patch(modelOrObject: Object|ParkaModel): QueryBuilder;

    patchAndFetchById(id: string|number, modelOrObject: Object|ParkaModel): QueryBuilder;

    delete(): QueryBuilder;

    deleteById(id: any|Array<any>): QueryBuilder;

    relate(ids: Array<any>): QueryBuilder;

    unrelate(): QueryBuilder;

    whereRef(): QueryBuilder;

    orWhereRef(): QueryBuilder;

    whereComposite(): QueryBuilder;

    whereInComposite(): QueryBuilder;

    whereJsonEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonNotEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonNotEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonNotSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonNotSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonNotSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    orWhereJsonNotSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): QueryBuilder;

    whereJsonIsArray(fieldExpression: string): QueryBuilder;

    orWhereJsonIsArray(fieldExpression: string): QueryBuilder;

    whereJsonNotArray(fieldExpression: string): QueryBuilder;

    orWhereJsonNotArray(fieldExpression: string): QueryBuilder;

    whereJsonIsObject(fieldExpression: string): QueryBuilder;

    orWhereJsonIsObject(fieldExpression: string): QueryBuilder;

    whereJsonNotObject(fieldExpression: string): QueryBuilder;

    orWhereJsonNotObject(fieldExpression: string): QueryBuilder;

    whereJsonHasAny(fieldExpression: string, keys: string|Array<string>): QueryBuilder;

    orWhereJsonHasAny(fieldExpression: string, keys: string|Array<string>): QueryBuilder;

    whereJsonHasAll(fieldExpression: string, keys: string|Array<string>): QueryBuilder;

    orWhereJsonHasAll(fieldExpression: string, keys: string|Array<string>): QueryBuilder;

    whereJsonField(fieldExpression: string, operator: string, value: boolean|number|string): QueryBuilder;

    orWhereJsonField(fieldExpression: string, operator: string, value: boolean|number|string): QueryBuilder;

    context(queryContext?: Object): QueryBuilder;

    reject(reason: any): QueryBuilder;

    resolve(value: any): QueryBuilder;

    isExecutable(): boolean;

    runBefore(): QueryBuilder;

    onBuild(): QueryBuilder;

    runAfter(): QueryBuilder;

    eager(relationExpression: string, filters: Object): QueryBuilder;

    allowEager(relationExpression: string): QueryBuilder;

    allowInsert(relationExpression: string): QueryBuilder;

    modelClass(): ParkaModel;

    toString(): string;

    toSql(): string;

    dumpSql(logger: Function): QueryBuilder;

    clone(): QueryBuilder;

    asCallback(callback: Function): Promise<any>;

    nodeify(callback: Function): Promise<any>;

    resultSize(): Promise<any>;

    page(page: number, pageSize: number): QueryBuilder;

    range(start: number, end: number): QueryBuilder;

    traverse: IObjectionTraverse;

    pick: IObjectionPickOrOmit;

    omit: IObjectionPickOrOmit;

}

export interface IObjectionTraverse {
    (modelClass: ParkaModel, traverser: Function): QueryBuilder;
    (traverser: Function): QueryBuilder;
}

export interface IObjectionPickOrOmit {
    (modelClass: ParkaModel, properties: Array<string>): QueryBuilder;
    (properties: Array<string>): QueryBuilder;
}

export interface IStaticQuery {
    (): QueryBuilder;
}


