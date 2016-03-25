import * as knex from 'knex';
import * as Promise from 'bluebird';


export class ParkaModel {

    static query: IStaticQuery;
    static fromJson: Function;

    constructor(json?) {
        if (json) {
            for(let attr in json) {
                this[attr] = json[attr];
            }
        }
    }
}

export interface IObjectionQueryBuilder extends knex.QueryBuilder {

    findById(arg: any|Array<any>): IObjectionQueryBuilder;

    insert(modelsOrObjects: Object|ParkaModel|Array<Object>|Array<ParkaModel>): IObjectionQueryBuilder;

    insertAndFetch(modelsOrObjects: Object|ParkaModel|Array<Object>|Array<ParkaModel>): IObjectionQueryBuilder;

    insertWithRelated(graph: Object|ParkaModel|Array<Object>|Array<ParkaModel>): IObjectionQueryBuilder;

    update(modelOrObject: Object|ParkaModel): IObjectionQueryBuilder;

    updateAndFetchById(id: string|number, modelorObject: Object|ParkaModel): IObjectionQueryBuilder;

    patch(modelOrObject: Object|ParkaModel): IObjectionQueryBuilder;

    patchAndFetchById(id: string|number, modelOrObject: Object|ParkaModel): IObjectionQueryBuilder;

    delete(): IObjectionQueryBuilder;

    deleteById(id: any|Array<any>): IObjectionQueryBuilder;

    relate(ids: Array<any>): IObjectionQueryBuilder;

    unrelate(): IObjectionQueryBuilder;

    whereRef(): IObjectionQueryBuilder;

    orWhereRef(): IObjectionQueryBuilder;

    whereComposite(): IObjectionQueryBuilder;

    whereInComposite(): IObjectionQueryBuilder;

    whereJsonEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonNotEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonNotEquals(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonNotSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonNotSupersetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonNotSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    orWhereJsonNotSubsetOf(fieldExpression: string, jsonObjectOrFieldExpression: Object|Array<any>|string): IObjectionQueryBuilder;

    whereJsonIsArray(fieldExpression: string): IObjectionQueryBuilder;

    orWhereJsonIsArray(fieldExpression: string): IObjectionQueryBuilder;

    whereJsonNotArray(fieldExpression: string): IObjectionQueryBuilder;

    orWhereJsonNotArray(fieldExpression: string): IObjectionQueryBuilder;

    whereJsonIsObject(fieldExpression: string): IObjectionQueryBuilder;

    orWhereJsonIsObject(fieldExpression: string): IObjectionQueryBuilder;

    whereJsonNotObject(fieldExpression: string): IObjectionQueryBuilder;

    orWhereJsonNotObject(fieldExpression: string): IObjectionQueryBuilder;

    whereJsonHasAny(fieldExpression: string, keys: string|Array<string>): IObjectionQueryBuilder;

    orWhereJsonHasAny(fieldExpression: string, keys: string|Array<string>): IObjectionQueryBuilder;

    whereJsonHasAll(fieldExpression: string, keys: string|Array<string>): IObjectionQueryBuilder;

    orWhereJsonHasAll(fieldExpression: string, keys: string|Array<string>): IObjectionQueryBuilder;

    whereJsonField(fieldExpression: string, operator: string, value: boolean|number|string): IObjectionQueryBuilder;

    orWhereJsonField(fieldExpression: string, operator: string, value: boolean|number|string): IObjectionQueryBuilder;

    context(queryContext?: Object): IObjectionQueryBuilder;

    reject(reason: any): IObjectionQueryBuilder;

    resolve(value: any): IObjectionQueryBuilder;

    isExecutable(): boolean;

    runBefore(): IObjectionQueryBuilder;

    onBuild(): IObjectionQueryBuilder;

    runAfter(): IObjectionQueryBuilder;

    eager(relationExpression: string, filters: Object): IObjectionQueryBuilder;

    allowEager(relationExpression: string): IObjectionQueryBuilder;

    allowInsert(relationExpression: string): IObjectionQueryBuilder;

    modelClass(): ParkaModel;

    toString(): string;

    toSql(): string;

    dumpSql(logger: Function): IObjectionQueryBuilder;

    clone(): IObjectionQueryBuilder;

    asCallback(callback: Function): Promise<any>;

    nodeify(callback: Function): Promise<any>;

    resultSize(): Promise<any>;

    page(page: number, pageSize: number): IObjectionQueryBuilder;

    range(start: number, end: number): IObjectionQueryBuilder;

    traverse: IObjectionTraverse;

    pick: IObjectionPickOrOmit;

    omit: IObjectionPickOrOmit;

}

export interface IObjectionTraverse {
    (modelClass: ParkaModel, traverser: Function): IObjectionQueryBuilder;
    (traverser: Function): IObjectionQueryBuilder;
}

export interface IObjectionPickOrOmit {
    (modelClass: ParkaModel, properties: Array<string>): IObjectionQueryBuilder;
    (properties: Array<string>): IObjectionQueryBuilder;
}

export interface IStaticQuery {
    (): IObjectionQueryBuilder;
}
