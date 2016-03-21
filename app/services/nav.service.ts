import {Injectable, Type} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteRegistry} from 'angular2/router';

import {AppComponent} from "../components/app.component";

@Injectable()
export class NavService {

    constructor(private registry: RouteRegistry) {}

    // Gets the list of registered with @RouteConfig routes
    // associated with given `component`
    getRoutes(component: Type) {

        return Reflect.getMetadata('annotations', component)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop();

    }

    // Updates the metadata added by @RouteConfig associated
    // with given `component`
    updateRouteConfig(component: Type, routeConfig) {

        let annotations = Reflect.getMetadata('annotations', component);
        let routeConfigIndex = -1;

        for (let i = 0; i < annotations.length; i += 1) {
            if (annotations[i].constructor.name === 'RouteConfig') {
                routeConfigIndex = i;
                break;
            }
        }

        if (routeConfigIndex < 0) {
            throw new Error('No route metadata attached to the component');
        }

        annotations[routeConfigIndex] = routeConfig;
        Reflect.defineMetadata('annotations', annotations, AppComponent);

    }

    // Adds additional `route` to given `component`
    addRoute(component: Type, route) {

        let routeConfig = this.getRoutes(component);
        routeConfig.configs.push(route);
        this.updateRouteConfig(component, routeConfig);
        this.registry.config(component, route);

    }

}
