import {Injectable} from 'angular2/core';
import {Router}     from 'angular2/router';

import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {ModuleService} from "./module.service";
import {Module} from "../models/module";
import {User} from "../models/user";
import {MessagesService} from "../directives/messages/messages.service";

@Injectable()
export class AuthService {

    private _validUser = false;
    private _module: Module = new Module();

    constructor(
        private _router:Router,
        private _apiService:ApiService,
        private _userService:UserService,
        private _moduleService:ModuleService,
        private _messageService:MessagesService
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

    login(loginData: any) {
        this._apiService.post('login', loginData)
            .subscribe(
                data => {
                    this.saveJwt(data.token);
                },
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error.message
                    })
                }
            );
    }

    logout() {
        let user = new User();
        this._userService.set(user);
        localStorage.clear();
        this._router.navigate(['Login']);
    }

    activate(id) {
        let data = {id:id};

        this._apiService.post('activate', data).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            }
        )
    }

    register(regData: any) {
        //noinspection TypeScriptUnresolvedVariable
        return this._apiService.postPromise('register', regData).then(
            data => {
                if (data.success) {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    });
                    return true;
                } else {
                    this._messageService.addMessage({
                        success: null,
                        error: data.error.message
                    });
                    return false;
                }
            }
        );
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

    private saveJwt(jwt) {
        if (jwt != null) {
            localStorage.setItem('jwt', jwt);
            this._apiService.getWithAuth('loginUser')
                .subscribe(
                    data => {
                        this._userService.setUserDetails(data);
                    },
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error.message
                        })
                    },
                    () => {
                        this._router.navigate(['Projects']);
                        this._moduleService.setPermissions();
                    }
                );
        }
    }


}
