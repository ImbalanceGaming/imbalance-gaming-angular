import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction, Location} from 'angular2/router';
import {Location} from "angular2/router";

@Directive({
    selector: 'router-outlet'
})
export class LoggedInOutletComponent extends RouterOutlet {
    publicRoutes:any;
    private parentRouter:Router;

    constructor(
        _elementRef:ElementRef,
        _loader:DynamicComponentLoader,
        _parentRouter:Router,
        @Attribute('name') nameAttr:string,
        private _location:Location
    ) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true,
            '/signup': true
        };
    }

    activate(instruction:ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
            this.parentRouter.navigate(['Login']);
        }
        return super.activate(instruction);
    }
}
