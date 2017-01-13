export let TableName = function (tableName: string) {
  return function (target: any) {

    target.tableName = tableName;
  };
};
