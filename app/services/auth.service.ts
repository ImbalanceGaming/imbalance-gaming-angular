import {Injectable} from 'angular2/core';
import {Router}     from 'angular2/router';

import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {ModuleService} from "./module.service";
import {Module} from "../models/module";

@Injectable()
export class AuthService {

    private _validUser = false;
    private _module: Module = new Module();

    constructor(
        private _router:Router,
        private _apiService:ApiService,
        private _userService:UserService,
        private _moduleService:ModuleService
    ) {

    }

    setup(moduleName) {
        this._moduleService.module$.subscribe(module => this._module = module);
        this._moduleService.getModule(moduleName).then(() => {
            this.loggedInCheck();
        });
    }
    
    loggedInCheck() {

        // Check that the user is logged in by first checking that they have
        // a token set and if so is that token still valid
        if (localStorage.getItem('jwt')) {
            this._apiService.getWithAuth('loginUser')
                .subscribe(
                    data => this.keyValid(data),
                    error => this.keyInvalid()
                );
        }

    }

    moduleAccess() {

        if(this._module.permission.view) {
            return true;
        } else {
            this._router.navigate(['Login'])
        }

    }

    getPagePermissions(sectionName: string) : Promise {

        return this._moduleService.getSection(sectionName).then(moduleSection => {
            return moduleSection.permission;
        });

    }

    private keyValid(userData) {

        if (!this._validUser) {
            this._validUser = true;
            this._userService.setUserDetails(userData);
            this._moduleService.setPermissions().then(() => {
                this.moduleAccess();
            });
        }

    }

    private keyInvalid() {
        this._router.navigate(['Login'])
    }


}
