import {ParkaApp} from '../core/parka-app';

export let Model = function () {
    return function (target) {
        console.log('arguments', arguments);
        console.log('ParkaApp', ParkaApp);
        console.log('ParkaApp.appInstance', ParkaApp.appInstance);
    };
};
