

export let TableName = function (tableName: string) {
    return function (target: any) {
        console.log('arguments', arguments);
        target.tableName = tableName;

    };
};
