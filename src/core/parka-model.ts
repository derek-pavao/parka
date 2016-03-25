import {QueryBuilder} from 'knex';

export class ParkaModel {

    static query: IObjectionQuery;
}


interface IObjectionQuery {
    (): QueryBuilder;
}
