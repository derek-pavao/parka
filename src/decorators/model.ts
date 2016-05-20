const objection = require('objection');

export let Model = function () {
    return function (target) {

        objection.Model.extend(target);
    };
};
