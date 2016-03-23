import {bootstrap}              from 'angular2/platform/browser';
import {provide, ComponentRef}  from 'angular2/core';
import {FORM_PROVIDERS}         from 'angular2/common';
import {ROUTER_PROVIDERS}       from 'angular2/router';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {AuthConfig, AuthHttp}   from 'angular2-jwt';
import 'rxjs/Rx';

import {AppComponent} from './components/app.component';
import {appInjector} from './common/app-injector';

import {Config} from './config/config';

bootstrap(AppComponent, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AuthHttp,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: 'jwt',
                tokenGetter: (() => localStorage.getItem('jwt')),
                noJwtError: true
            }), http);
        },
        deps: [Http]
    }),
    provide('config', {
        useValue: {
            key1: 'value',
            visibleDropdowns: false,
            nested: {
                name: Config.properties.name,
                description: Config.properties.description,
                version: Config.properties.version,
                devMode: Config.properties.devMode,
                liveAPIUrl: Config.properties.liveAPIUrl,
                devAPIUrl: Config.properties.devAPIUrl
            }
        }
    })
]).then((appRef: ComponentRef) => {
    // store a reference to the application injector
    appInjector(appRef.injector);
});
