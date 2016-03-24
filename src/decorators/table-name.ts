export let TableName = function (tableName: string) {
    return function (target: Object, name: string) {
        console.log('arguments', arguments);

    };
};
