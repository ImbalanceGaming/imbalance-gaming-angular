import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import 'rxjs/Rx';

import {AppComponent} from './components/app.component';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS
]);
