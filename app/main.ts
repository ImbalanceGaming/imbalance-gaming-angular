import {bootstrap}              from '@angular/platform-browser-dynamic';
import {provide}                from '@angular/core';
import {Http, HTTP_PROVIDERS}   from '@angular/http';
import {AuthConfig, AuthHttp}   from 'angular2-jwt';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
// import 'rxjs/Rx';

import {AppComponent} from './components/app.component';
import {appRouterProviders} from './components/app.routes';
import {AuthGuard} from "./services/auth-guard.service";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    appRouterProviders,
    AuthGuard,
    disableDeprecatedForms(),
    provideForms(),
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: 'jwt',
                tokenGetter: (() => localStorage.getItem('jwt')),
                noJwtError: true,
                globalHeaders: [{'Content-Type': 'application/json'}]
            }), http);
        },
        deps: [Http]
    })
]).catch(err => console.error(err));
