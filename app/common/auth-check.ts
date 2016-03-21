import {Injector} from 'angular2/core';
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from 'angular2/router';

export const authCheck = (next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = appInjector(); // get the stored reference to the injector
    let router: Router = injector.get(Router);

    // return a boolean or a promise that resolves a boolean
    return new Promise((resolve) => {
        if (localStorage.getItem('jwt')) {
            resolve(true);
        } else {
            router.navigate(['/Login']);
            resolve(false);
        }
    });
};
