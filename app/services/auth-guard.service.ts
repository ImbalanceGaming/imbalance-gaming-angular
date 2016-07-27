import {CanActivate, Router}    from '@angular/router';
import {Injectable} from "@angular/core";
// import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router
        // private _authService: AuthService
    ){};

    canActivate() {

        if (localStorage.getItem('jwt')) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }

        // if (this._authService.validUser) {
        //     return true;
        // } else {
        //     this._router.navigate(['/login']);
        //     return false;
        // }
    }
}
